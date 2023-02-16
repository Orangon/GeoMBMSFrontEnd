import { useEffect, useState } from 'react';

import { Row, Progress, Space, Typography, Button, Modal } from 'antd';
import { StopOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { useRecoilState } from 'recoil';
import { modelRunPercentState } from '@/pages/Computation/.Recoil/atom';
import { useSubscription } from '@/hooks/mqtt';
import { startsWith } from 'lodash';

import { updateTask } from '@/pages/Task/service';

import styles from './index.less';

const { Paragraph, Text } = Typography;

const ModelMonitor = ({
    task,
    params,
    onStop,
    onSuccess,
}: {
    task?: OneSIS.Task;
    params: any;
    onStop?: (result: OneSIS.Model.RunResult) => void;
    onSuccess?: (result: OneSIS.Model.RunResult) => void;
}) => {
    const { message } = useSubscription([`task/#`], {
        qos: 0,
    });
    const [curTask, setCurTask] = useState<OneSIS.Task>();
    const [percent, setPercent] = useRecoilState(modelRunPercentState);

    useEffect(() => {
        if (task) {
            setCurTask(task);
        }
    }, [task]);

    useEffect(() => {
        switch (curTask?.status) {
            case 'FINISHED':
                onSuccess?.({
                    status: 'process',
                    success: true,
                });
                break;
            case 'RUNNING':
                setPercent(curTask.percentage ?? 0);
                break;
            case 'CANCELLED':
                onStop?.({
                    status: 'error',
                    success: false,
                    message: ['用户主动中断执行'],
                });
                break;
            default:
                break;
        }
    }, [curTask]);

    useEffect(() => {
        try {
            if (startsWith(message?.topic, 'task/')) {
                let _re: OneSIS.Task = JSON.parse(String(message?.message ?? ''));
                if (_re) {
                    if (_re.id === task?.id) {
                        setCurTask(_re);
                    }
                }
            }
        } catch (e) {
            console.log('异常消息：', e, message);
        }
    }, [message]);

    const doStop = async () => {
        try {
            updateTask(curTask?._links?.self?.href ?? '', {
                id: curTask?.id,
                status: 'CANCELLING',
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Row className={styles.wrapper} align="middle" justify="center">
            <Space style={{ width: '100%' }} direction="vertical">
                <p>{curTask?.message ?? ''}</p>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={percent}
                />
                <Paragraph style={{ margin: '10px auto', textAlign: 'left' }}>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        模型运行参数:
                    </Text>
                    <blockquote>
                        <ul style={{ margin: 0 }}>
                            {params.map(({ param_name, param_value }: any, index: number) => {
                                return <li key={index}>{`${param_name}: ${param_value}`}</li>;
                            })}
                        </ul>
                    </blockquote>
                </Paragraph>
                <Button
                    type="primary"
                    danger
                    icon={<StopOutlined />}
                    onClick={() => {
                        Modal.confirm({
                            title: '中断操作不可逆，确定要中断执行吗?',
                            icon: <ExclamationCircleOutlined />,
                            okText: '确定',
                            okType: 'danger',
                            cancelText: '再想想',
                            onOk: doStop,
                        });
                    }}
                >
                    中断执行
                </Button>
            </Space>
        </Row>
    );
};
export default ModelMonitor;

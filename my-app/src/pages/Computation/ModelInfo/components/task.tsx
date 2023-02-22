import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ProForm, { ProFormItem, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Button, Space, Typography } from 'antd';

import { createTask, queryTaskTypes } from '@/pages/Task/service';

import { get } from 'lodash';
import moment from 'moment';
import URI from 'urijs';

const ModelTask = ({
    model,
    metadata,
    params,
    onSuccess,
    onBack,
}: {
    model?: GeoMBMS.Resource;
    metadata?: GeoMBMS.Model.Metadata;
    params?: any;
    onSuccess?: (task: GeoMBMS.Task) => void;
    onBack?: () => void;
}) => {
    const [formRef] = ProForm.useForm();
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(
            get(metadata, 'meta.identification.model_name.zh-CN') ??
                get(metadata, 'meta.identification.model_name') ??
                '',
        );
    }, [metadata]);

    const doSubmit = async (form: Record<string, any>) => {
        try {
            let task: GeoMBMS.Task = await createTask({
                ...form,
                dataId: model?.id,
                dataUrl: model?.url,
                detail: {
                    '': params,
                },
            });
            onSuccess?.(task);
        } catch (e) {
            console.log(e);
        }
    };

    if (!name) {
        return null;
    }

    return (
        <ProForm
            form={formRef}
            layout="horizontal"
            style={{ margin: 30, marginTop: 20 }}
            labelCol={{
                style: {
                    width: 90,
                },
            }}
            submitter={false}
            onFinish={doSubmit}
        >
            <ProFormText
                required
                name="name"
                label="任务名称"
                rules={[
                    {
                        required: true,
                        message: '请输入任务名称',
                    },
                ]}
                initialValue={`${name}-${moment().format('YYYYMMDDHHmmss')}`}
            ></ProFormText>
            <ProFormSelect
                required
                name="type"
                label="任务类型"
                rules={[
                    {
                        required: true,
                        message: '请选择任务类型',
                    },
                ]}
                request={async () => {
                    let result: OneSIS.HalPagedResponseType<{
                        types: OneSIS.TaskType[];
                    }> = await queryTaskTypes();
                    return result._embedded.types.map((item: OneSIS.TaskType) => {
                        return {
                            label: item.name,
                            value: URI(item?._links?.self?.href).port('').toString(),
                        };
                    });
                }}
            ></ProFormSelect>
            <ProFormItem label="执行参数">
                <Typography.Paragraph>
                    <pre style={{ margin: 0 }}>
                        <ul style={{ margin: 0 }}>
                            {params.map(({ param_name, param_value }: any, index: number) => {
                                return <li key={index}>{`${param_name}: ${param_value}`}</li>;
                            })}
                        </ul>
                    </pre>
                </Typography.Paragraph>
            </ProFormItem>
            <ProFormItem style={{ textAlign: 'center' }}>
                <Space>
                    <Button type="default" icon={<ArrowLeftOutlined />} onClick={onBack}>
                        上一步
                    </Button>
                    <Button type="primary" onClick={formRef?.submit}>
                        <Space>
                            开始执行
                            <ArrowRightOutlined />
                        </Space>
                    </Button>
                </Space>
            </ProFormItem>
        </ProForm>
    );
};
export default ModelTask;

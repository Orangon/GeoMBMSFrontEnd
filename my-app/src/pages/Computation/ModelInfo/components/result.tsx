import { Button, Result, Typography } from 'antd';
import {
    ArrowLeftOutlined,
    CodeOutlined,
    RedoOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;
const ModelSuccess = ({ result }: { result: OneSIS.Model.RunResult }) => (
    <Result
        status="success"
        title="模型执行完毕!"
        extra={[
            <Button type="primary" key="console" icon={<ArrowLeftOutlined />}>
                返回地图
            </Button>,
            <Button key="buy" icon={<CodeOutlined />}>
                查看日志
            </Button>,
        ]}
    />
);

const ModelFaild = ({
    result,
    onRunAgain,
}: {
    result: OneSIS.Model.RunResult;
    onRunAgain?: () => void;
}) => (
    <Result
        status="error"
        title="模型执行失败!"
        subTitle="请检查模型相关参数后，重新尝试."
        extra={[
            <Button type="primary" key="console" icon={<ArrowLeftOutlined />}>
                返回地图
            </Button>,
            <Button key="buy" icon={<RedoOutlined />} onClick={onRunAgain}>
                再次执行
            </Button>,
        ]}
    >
        <div className="desc">
            <Paragraph>
                <Text
                    strong
                    style={{
                        fontSize: 16,
                    }}
                >
                    错误列表:
                </Text>
            </Paragraph>
            {(result?.message ?? []).map((item, index: number) => (
                <Paragraph key={index}>
                    <CloseCircleOutlined style={{ color: 'red', margin: 'auto 10px' }} /> {item}
                </Paragraph>
            ))}
        </div>
    </Result>
);

export { ModelSuccess, ModelFaild };

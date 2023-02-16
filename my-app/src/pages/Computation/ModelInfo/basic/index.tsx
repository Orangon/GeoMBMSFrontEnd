import { useState } from 'react';
import { Descriptions, Space, Tag, Collapse, Empty } from 'antd';
import {
    IdcardOutlined,
    AppstoreOutlined,
    CalculatorOutlined,
    ExperimentOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import { last } from 'lodash';
import styles from './index.less';
import { GeoMBMS } from '@/services/ant-design-pro/typings';
const { Panel } = Collapse;

export default ({ model }: { model?: GeoMBMS.Model.Metadata }) => {
    const [activeKeys, setActiveKeys] = useState<string>('Identification');
    const { meta } = model ?? {};
    const { identification, application, operation, technique, source } = meta ?? {};
    if (!meta) {
        return <Empty style={{ margin: 50 }} />;
    }

    return (
        <div className={styles.wrapper}>
            <Space size={'large'} direction="vertical" style={{ width: '100%', height: '100%' }}>
                {/* Identification */}
                <Collapse
                    activeKey={activeKeys}
                    expandIconPosition="end"
                    onChange={(key) => setActiveKeys(last(key) ?? '')}
                >
                    <Panel
                        header={
                            <Space>
                                <IdcardOutlined />
                                Identification
                            </Space>
                        }
                        key="Identification"
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 2, sm: 2, md: 2 }}
                            labelStyle={{ width: 180, textAlign: 'right' }}
                            contentStyle={{ width: 300 }}
                        >
                            <Descriptions.Item label="model_name" span={2}>
                                {identification?.model_name?.['zh-CN'] ??
                                    identification?.model_name ??
                                    ''}
                            </Descriptions.Item>
                            <Descriptions.Item label="description" span={2}>
                                {identification?.description?.['zh-CN'] ??
                                    identification?.description ??
                                    ''}
                            </Descriptions.Item>
                            <Descriptions.Item label="docker_image_name">
                                {identification?.docker_image_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="model_unique_abbr">
                                {identification?.model_unique_abbr}
                            </Descriptions.Item>
                            <Descriptions.Item label="semantic">
                                {identification?.semantic}
                            </Descriptions.Item>
                            <Descriptions.Item label="category_application">
                                {identification?.category_application}
                            </Descriptions.Item>
                            <Descriptions.Item label="category_data">
                                <Space wrap>
                                    {identification?.category_data?.map(
                                        (item: string, index: number) => {
                                            return (
                                                <Tag key={index} color="processing">
                                                    {item}
                                                </Tag>
                                            );
                                        },
                                    )}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="keywords">
                                <Space wrap>
                                    {identification?.keywords?.map(
                                        (item: string, index: number) => {
                                            return (
                                                <Tag key={index} color="processing">
                                                    {item?.['zh-CN'] ?? item ?? ''}
                                                </Tag>
                                            );
                                        },
                                    )}
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                {/* Application */}
                <Collapse
                    activeKey={activeKeys}
                    expandIconPosition="end"
                    onChange={(key) => setActiveKeys(last(key) ?? '')}
                >
                    <Panel
                        header={
                            <Space>
                                <AppstoreOutlined />
                                Application
                            </Space>
                        }
                        key="Application"
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 2, sm: 2, md: 2 }}
                            labelStyle={{ width: 180, textAlign: 'right' }}
                            contentStyle={{ width: 300 }}
                        >
                            {/* 应用领域 */}
                            <Descriptions.Item label="domain" span={2}>
                                {application?.domain}
                            </Descriptions.Item>
                            {/* 应用目标 */}
                            <Descriptions.Item label="objective">
                                {application?.objective}
                            </Descriptions.Item>
                            {/* 空间维度 */}
                            <Descriptions.Item label="dimension">
                                <Space wrap>
                                    {application?.dimension?.map((item: string, index: number) => {
                                        return (
                                            <Tag key={index} color="processing">
                                                {item}
                                            </Tag>
                                        );
                                    })}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="spatial_resolution">
                                <Space wrap>
                                    {application?.spatial_resolution?.map(
                                        (item: string, index: number) => {
                                            return (
                                                <Tag key={index} color="processing">
                                                    {item}
                                                </Tag>
                                            );
                                        },
                                    )}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="spatial_reference" span={2}>
                                <Space wrap>
                                    {application?.spatial_reference?.map(
                                        (item: string, index: number) => {
                                            return (
                                                <Tag key={index} color="processing">
                                                    {item}
                                                </Tag>
                                            );
                                        },
                                    )}
                                </Space>
                            </Descriptions.Item>
                            {/* 机理 */}
                            <Descriptions.Item label="mechanism">
                                {application?.mechanism}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                {/* Operation */}
                <Collapse
                    activeKey={activeKeys}
                    expandIconPosition="end"
                    onChange={(key) => setActiveKeys(last(key) ?? '')}
                >
                    <Panel
                        header={
                            <Space>
                                <CalculatorOutlined />
                                Operation
                            </Space>
                        }
                        key="Operation"
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 2, sm: 2, md: 2 }}
                            labelStyle={{ width: 180, textAlign: 'right' }}
                            contentStyle={{ width: 300 }}
                        >
                            <Descriptions.Item label="usage" span={2}>
                                {operation?.usage}
                            </Descriptions.Item>
                            <Descriptions.Item label="output_display" span={2}>
                                {operation?.output_display}
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                {/* Technique */}
                <Collapse
                    activeKey={activeKeys}
                    expandIconPosition="end"
                    onChange={(key) => setActiveKeys(last(key) ?? '')}
                >
                    <Panel
                        header={
                            <Space>
                                <ExperimentOutlined />
                                Technique
                            </Space>
                        }
                        key="Technique"
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 2, sm: 2, md: 2 }}
                            labelStyle={{ width: 180, textAlign: 'right' }}
                            contentStyle={{ width: 300 }}
                        >
                            <Descriptions.Item label="language">
                                <Space wrap>
                                    {technique?.language?.map((item: string, index: number) => {
                                        return (
                                            <Tag key={index} color="processing">
                                                {item}
                                            </Tag>
                                        );
                                    })}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="os">
                                <Space wrap>
                                    {technique?.os?.map((item: string, index: number) => {
                                        return (
                                            <Tag key={index} color="processing">
                                                {item}
                                            </Tag>
                                        );
                                    })}
                                </Space>
                            </Descriptions.Item>
                            {/* 并行方式 */}
                            <Descriptions.Item label="parallel" span={2}>
                                <Space wrap>
                                    {technique?.parallel?.map((item: string, index: number) => {
                                        return (
                                            <Tag key={index} color="processing">
                                                {item}
                                            </Tag>
                                        );
                                    })}
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label="dependencies" span={2}>
                                <Space wrap>
                                    {technique?.dependencies?.map((item: any, index: number) => {
                                        return (
                                            <Tag
                                                key={index}
                                                color="processing"
                                            >{`${item.name}-${item.version}`}</Tag>
                                        );
                                    })}
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
                {/* Source */}
                <Collapse
                    activeKey={activeKeys}
                    expandIconPosition="end"
                    onChange={(key) => setActiveKeys(last(key) ?? '')}
                >
                    <Panel
                        header={
                            <Space>
                                <GithubOutlined />
                                Source
                            </Space>
                        }
                        key="Source"
                    >
                        <Descriptions
                            bordered
                            column={{ xs: 2, sm: 2, md: 2 }}
                            labelStyle={{ width: 180, textAlign: 'right' }}
                            contentStyle={{ width: 300 }}
                        >
                            <Descriptions.Item label="maintainer">
                                {source?.maintainer}
                            </Descriptions.Item>
                            <Descriptions.Item label="organization">
                                {source?.organization}
                            </Descriptions.Item>
                            <Descriptions.Item label="contact">{source?.contact}</Descriptions.Item>
                            {/* <Descriptions.Item label="version">{source?.version}</Descriptions.Item> */}
                            <Descriptions.Item label="repository" span={2}>
                                {source?.repository}
                            </Descriptions.Item>
                            <Descriptions.Item label="integrated_softwares" span={2}>
                                <ul>
                                    {source?.integrated_softwares?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <li
                                                    key={index}
                                                >{`${item.name}-${item.version}-${item.license}`}</li>
                                            );
                                        },
                                    )}
                                </ul>
                            </Descriptions.Item>
                            <Descriptions.Item label="references" span={2}>
                                <ul>
                                    {source?.references?.map((item: string, index: number) => {
                                        return <li key={index}>{item}</li>;
                                    })}
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

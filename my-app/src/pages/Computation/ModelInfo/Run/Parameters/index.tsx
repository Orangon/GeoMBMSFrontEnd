import React, { useEffect, useState } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
    Form,
    FormStep,
    FormItem,
    Input,
    FormCollapse,
    DatePicker,
    Radio,
    Checkbox,
    Select,
    Switch,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import { Collapse, Empty, InputNumber, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { extName } from '@/utils/size';
import { compact, endsWith, isEmpty, isEqual } from 'lodash';

// import ModelMonitor from '../Monitor';

import styles from './index.less';
import DataSelector from '../../components/DataSelector';


const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormStep,
        FormCollapse,
        Input,
        DatePicker,
        Radio,
        Checkbox,
        Select,
        Switch,
        InputNumber,
        DataSelector,

    },
});
const ModelParameters = ({
    metadata,
    params,
    onInit,
    onSuccess,
}: {
    metadata?: GeoMBMS.Model.Metadata;
    params: { [key: string]: any }[];
    onInit?: () => void;
    onSuccess?: (values: { [key: string]: any }[]) => void;
}) => {
    const form = createForm();
    const [namePaths, setNamePaths] = useState<any[]>([]);

    useEffect(() => {
        if (!isEmpty(metadata)) {
            setNamePaths(getNamePath(metadata?.env ?? []));
            onInit?.();
        }
    }, [metadata]);

    const renderGroup = (node: GeoMBMS.Model.ParamGroup, index: number) => {
        const groupName = `gropu${index}`,
            groupContentName = `gropu${index}Content`;
        return (
            <SchemaField.Void
                key={index}
                x-component="FormCollapse"
                x-component-props={{
                    collapsible: 'header',
                    ghost: false,
                    bordered: true,
                    style: {
                        marginBottom: 20,
                    },
                }}
                x-index={index}
                name={groupName}
            >
                <SchemaField.Void
                    x-component="FormCollapse.CollapsePanel"
                    x-component-props={{
                        header: node.title?.['zh-CN'] ?? node.title ?? '',
                        style: { padding: '0px 0px 0px 0px' },
                    }}
                    x-index={0}
                    name={groupContentName}
                >
                    {node.children.map((child: any, childIndex: number) => {
                        if (child.type === 'Collapse') {
                            return renderGroup(child as GeoMBMS.Model.ParamGroup, childIndex);
                        } else {
                            return renderComponent(child as GeoMBMS.Model.Param, childIndex);
                        }
                    })}
                </SchemaField.Void>
            </SchemaField.Void>
        );
    };

    const renderComponent = (node: GeoMBMS.Model.Param, index: number) => {
        let basic: any = {
            key: index,
            name: node.name,
            'x-index': index,
            'x-decorator': 'FormItem',
            title: node.label?.['zh-CN'] ?? node.label ?? '',
            description: node.description?.['zh-CN'] ?? node.description ?? '',
            required: node?.required ?? false,
            default: node?.default ?? node?.compnentProps?.defaultValue,
            'x-validator': node?.validators ?? [],
            'x-component': node.componentType ?? 'Input',
            'x-component-props': node.compnentProps ?? {},
            'x-reactions': {
                dependencies: compact(
                    (node.reactions?.dependencies ?? []).map((dependency) => {
                        let _index = namePaths.findIndex((path: string) =>
                            endsWith(path, dependency.name),
                        );
                        if (_index < 0) return null;
                        return {
                            property: dependency.property,
                            type: 'any',
                            source: namePaths[_index],
                            name: dependency.name,
                        };
                    }),
                ),
                fulfill: node?.reactions?.fulfill ?? {},
            },
        };
        if (!isEmpty(params)) {
            let _value = params?.find((item: any) => item.param_name === node.name)?.param_value;
            if (_value) {
                if (node.componentType === 'DataSelector') {
                    basic.default = {
                        fileName: _value,
                        url: _value,
                        ext: extName(_value).toLowerCase(),
                    };
                } else {
                    basic.default = _value;
                }
            }
        }
        switch (node.componentType) {
            case 'DataSelector':
                return <SchemaField.Markup {...basic} />;
            case 'Select':
            case 'RadioGroup':
            case 'CheckboxGroup':
                let _node = node as GeoMBMS.Model.ParamSelect;
                return <SchemaField.Markup {...basic} enum={_node.enum} />;
            case 'InputNumber':
                return <SchemaField.Number {...basic} />;
            case 'Switch':
                return <SchemaField.Boolean {...basic} />;
            case 'input':
                return <SchemaField.String {...basic} x-component="Input" />;
            case 'DatePicker':
            default:
                return <SchemaField.String {...basic} />;
        }
    };

    const getNamePath = (data: any[]) => {
        const list: any[] = [];
        const func = (node: any, index: number, result: any[]) => {
            if (node.hasOwnProperty('children')) {
                result = result.concat(`gropu${index}`, `gropu${index}Content`);
                (node?.children ?? []).forEach((item: any, itemIndex: number) => {
                    func(item, itemIndex, result);
                });
            } else {
                list.push(result.concat(node.name).join('.'));
            }
        };
        data.forEach((item: any, index: number) => {
            func(item, index, []);
        });
        return list;
    };

    const doSubmit = async (values: any) => {
        onSuccess?.(
            Object.keys(values).map((key) => {
                let _value = values[key];
                return {
                    param_name: key,
                    param_value: _value?.url ?? _value,
                };
            }),
        );
    };

    if (isEmpty(namePaths)) {
        return <Empty style={{ margin: 50 }} />;
    }
    return (
        <Form form={form} labelCol={3} wrapperCol={20} className={styles.wrapper}>
            <SchemaField>
                <div style={{ margin: 20 }}>
                    <div style={{ display: 'none' }}>
                        <Collapse defaultActiveKey={['1']}></Collapse>
                    </div>
                    {(metadata?.env ?? []).map(
                        (item: GeoMBMS.Model.ParamGroup | GeoMBMS.Model.Param, index: number) => {
                            if (item.hasOwnProperty('children')) {
                                if (isEmpty(item['children'] ?? [])) {
                                    return null;
                                }
                                return renderGroup(item as GeoMBMS.Model.ParamGroup, index);
                            } else {
                                return renderComponent(item as GeoMBMS.Model.Param, index);
                            }
                        },
                    )}
                </div>
            </SchemaField>
            <FormButtonGroup align="center">
                {/* <Submit onSubmit={doSubmit}>
                    <Space>
                        下一步
                        <ArrowRightOutlined />
                    </Space>
                </Submit> */}
            </FormButtonGroup>
        </Form>
    );
};
export default React.memo(ModelParameters, (prevProps, nextProps) => {
    return isEqual(prevProps?.metadata, nextProps?.metadata);
});

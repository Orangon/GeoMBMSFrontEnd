import React, { useContext, useRef, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import MyContext from '@/components/Context';
import CommonIconFont from '@/components/CommonIconFont';

import styles from './table.less';
import fileIconStyles from '../fileIcon.less';

const TableView = ({
    style,
    single,
    mode,
}: {
    style?: React.CSSProperties;
    single?: boolean | undefined;
    mode?: OneSIS.Components.FileSelector.SelectMode;
}) => {
    const actionRef = useRef<ActionType>();
    const myContext: any = useContext(MyContext);
    const { data, selectedData, setSelectedData, onDoubleClickFolder } = myContext;
    const iconSize: number = 16;
    const columns: ProColumns<any>[] = [
        {
            title: '名称',
            dataIndex: 'fileName',
            render: (_, record) => {
                const mime = _getMime(record);
                const _icon = (!mime && (
                    <CommonIconFont
                        type="default"
                        style={{ fontSize: iconSize, marginRight: 10 }}
                    ></CommonIconFont>
                )) || (
                    <i
                        className={`${fileIconStyles.fileIcon} ${fileIconStyles[`x-${mime}`]}`}
                        style={{
                            width: iconSize,
                            height: iconSize,
                            marginRight: 10,
                        }}
                    ></i>
                );
                return (
                    (record.fileType === 'FOLDER' && (
                        <Button
                            type="link"
                            size="small"
                            icon={_icon}
                            onClick={(e) => {
                                onDoubleClickFolder(record);
                                e.stopPropagation();
                                return false;
                            }}
                        >
                            {_}
                        </Button>
                    )) || (
                        <span style={{ marginLeft: 10 }}>
                            {_icon}
                            {_}
                        </span>
                    )
                );
            },
        },
        {
            title: '路径',
            dataIndex: 'url',
            // align: 'center',
            width: 400,
            ellipsis: true,
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            width: 180,
            align: 'center',
            valueType: 'digit',
        },
        {
            title: '最后修改时间',
            dataIndex: 'lastmod',
            width: 180,
            align: 'center',
            valueType: 'dateTime',
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            actionRef?.current?.reloadAndRest?.();
        }, 100);
    }, [data]);

    const _getMime = (obj: any) => {
        if (obj.fileType === 'FILE') {
            return obj.fileName.substring(obj.fileName.lastIndexOf('.') + 1).toLowerCase();
        } else {
            return '';
        }
    };

    return (
        <div className={styles.wrapper} style={{ ...style }}>
            <ProTable<any>
                actionRef={actionRef}
                bordered={true}
                search={false}
                size="middle"
                rowKey={(record) => record.fileName}
                rowSelection={{
                    type: single ? 'radio' : 'checkbox',
                    selectedRowKeys: selectedData.map((item: any) => item.fileName),
                    onChange: (_, selectedRows) => {
                        setSelectedData?.(selectedRows);
                    },
                    getCheckboxProps: (record: any) => {
                        let flag: boolean = false;
                        if (mode === 'Folder') {
                            flag = !(record.fileType !== 'FILE');
                        }
                        if (mode === 'File') {
                            flag = record.fileType !== 'FILE';
                        }
                        return {
                            disabled: flag,
                            name: record.name,
                        };
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            setSelectedData([record]);
                        }, // 点击行
                        onDoubleClick: (event) => {
                            if (record.type !== 'file') {
                                onDoubleClickFolder?.(record);
                            }
                        },
                    };
                }}
                pagination={{
                    defaultPageSize: 20,
                    pageSizeOptions: ['5', '10', '15', '20', '25', '50', '100'],
                }}
                dataSource={data ?? []}
                options={false}
                columns={columns ?? []}
            ></ProTable>
        </div>
    );
};
export default TableView;

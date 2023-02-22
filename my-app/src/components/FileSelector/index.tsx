import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Modal, Button, Spin, Card } from 'antd';

import MyContext from '@/components/Context';
import Toolbar from './toolbar';
import Breadcrumb from './breadcrumb';
import TableView from './view/table';
import CardView from './view/card';

import { queryDatas } from './service';

import { isEmpty } from 'lodash';

import styles from './index.less';

const FileSelector = (props: OneSIS.Components.FileSelector.Props) => {
    const { defaultPath, defaultViewType, mode, single, onSelectedChange } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [fullPath, setFullPath] = useState<any[]>([]);
    const [viewType, setViewType] = useState<OneSIS.Components.FileSelector.ViewType>(
        defaultViewType ?? 'Card',
    );
    const [iconSize, setIconSize] = useState<number>(100);
    const [data, setData] = useState<any[]>([]);
    const [selectedData, setSelectedData] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, [fullPath]);

    useUpdateEffect(() => {
        onSelectedChange?.(selectedData);
    }, [selectedData]);

    const loadData = async () => {
        if (isEmpty(fullPath)) {
            fetchData();
        } else {
            fetchData(`/${fullPath.map((item) => item.fileName).join('/')}/`);
        }
    };

    const fetchData = async (path?: string) => {
        setLoading(true);
        const _data = await queryDatas({
            path: path ?? defaultPath ?? '/',
            extensionsFilter: props?.extensionsFilter ?? [],
        });
        setLoading(false);
        setData(_data);
    };

    const onDoubleClickFolder = (folder: any): void => {
        let _new = [...fullPath];
        if (isEmpty(folder)) {
            _new = [];
        } else {
            _new.push(folder);
        }
        setFullPath(_new);
    };

    const onTriggerEvent = async (type: string) => {
        switch (type) {
            case 'reload':
                loadData();
                break;
            default:
                break;
        }
    };

    return (
        <MyContext.Provider
            value={{
                props,
                fullPath,
                setFullPath,
                data,
                viewType,
                setViewType,
                iconSize,
                setIconSize,
                selectedData,
                setSelectedData,
                onDoubleClickFolder,
            }}
        >
            <Spin spinning={loading} wrapperClassName={styles.wrapper}>
                <Card>
                    <div className={styles.header}>
                        <Breadcrumb></Breadcrumb>
                    </div>
                    {
                        <div className={styles.subHeader}>
                            <Toolbar onTriggerEvent={onTriggerEvent}></Toolbar>
                        </div>
                    }
                    <div className={styles.content} style={{ height: '60vh' }}>
                        {viewType === 'Card' && <CardView single={single} mode={mode}></CardView>}
                        {viewType === 'Table' && (
                            <TableView single={single} mode={mode}></TableView>
                        )}
                    </div>
                </Card>
            </Spin>
        </MyContext.Provider>
    );
};

const FileSelectorModal: React.FC<
    OneSIS.Components.FileSelector.Props &
        OneSIS.ModalProps & {
            onOk?: (selected: any) => void;
        }
> = (props) => {
    const {
        title,
        show,
        width,
        height,
        bodyStyle,
        defaultViewType,
        mode,
        single,
        extensionsFilter,
        onOk,
        onCancel,
    } = props;
    const [selected, setSelected] = useState<any>(null);

    if (!show) {
        return null;
    }
    return (
        <Modal
            title={title ?? '文件夹、文件选择'}
            className={styles.modalWrapper}
            open={show}
            width={width ?? 1280}
            destroyOnClose={true}
            bodyStyle={bodyStyle ?? { padding: 10 }}
            footer={[
                <Button onClick={onCancel}>取消</Button>,
                <Button onClick={() => onOk?.(selected)}>确定</Button>,
            ]}
            onCancel={onCancel}
        >
            <FileSelector
                defaultPath={'/'}
                mode={mode}
                single={single}
                defaultViewType={defaultViewType}
                extensionsFilter={extensionsFilter}
                height={height}
                onSelectedChange={setSelected}
            ></FileSelector>
        </Modal>
    );
};

export default FileSelector;
export { FileSelectorModal };

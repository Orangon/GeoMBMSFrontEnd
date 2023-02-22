import React, { useState } from 'react';
import { Modal, Button, Upload, message, Row, Col } from 'antd';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { createClient } from 'webdav';

import { compact, get } from 'lodash';
import { formatFileSize } from '@/utils/size';

import styles from './uploadModal.less';

const UploadModal: React.FC<OneSIS.ModalProps & { catalog: any }> = (props) => {
    const fileLength = 10,
        fileSize = 5000,
        length = 100,
        format = 'all';
    const { title, catalog, show, width, bodyStyle, onCancel } = props;
    const [fileList, setFileList] = useState<any[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const uploadProps = {
        name: 'file',
        multiple: true,
        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file: any): boolean => {
            setFileList([...fileList, file]);
            return false;
        },
        disabled: !!(fileList.length >= fileLength),
        fileList,
        itemRender: (originNode: any, file: any) => {
            return (
                <Row align="middle" style={{ width: '100%' }}>
                    <Col span={20}>{originNode}</Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <span>{formatFileSize(file.size)}</span>
                    </Col>
                </Row>
            );
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent?: number) => `${parseFloat((percent ?? 0).toFixed(2))}%`,
        },
    };

    const handleUpload = async () => {
        message.warning('开发中...');
    };

    if (!show) {
        return null;
    }

    return (
        <Modal
            title={
                <>
                    <UploadOutlined style={{ marginRight: 10 }} />
                    {title ?? '上传'}
                </>
            }
            open={show}
            onCancel={() => {
                onCancel?.('');
            }}
            width={width ?? 600}
            className={`custom-modal ${styles.validForm}`}
            bodyStyle={bodyStyle ?? { padding: '5px 20px' }}
            maskClosable={false}
            destroyOnClose={true}
            footer={
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={uploading || fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? '正在上传...' : '开始上传'}
                </Button>
            }
        >
            <div className={`${styles.primaryItem} ${styles.row}`}>
                <div className={styles.btnItem}>
                    <Upload {...uploadProps} fileList={fileList}>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            disabled={!!(fileList.length >= fileLength)}
                            style={{ marginTop: 8 }}
                        >
                            添加文件
                        </Button>
                    </Upload>
                </div>
            </div>
            {format === 'all' ? (
                <div>
                    <p>
                        1. 支持批量上传，多次上传更新，同时上传文件数量不可超过
                        {fileLength}个；
                    </p>
                    <p>2. 附件上传格式不做要求；</p>
                    <p>3. 上传文件名称不可超过{length}个字符；</p>
                    <p>4. 上传单个文件大小不可超过{fileSize}M；</p>
                </div>
            ) : (
                <div>
                    <p>
                        1. 名单导入支持仅{format}格式，{format}
                        字段间以英文逗号隔开；
                    </p>
                    <p>2. 上传文件名称不可超过{length}个字符；</p>
                    <p>3. 上传单个文件大小不可超过{fileSize}M；</p>
                </div>
            )}
        </Modal>
    );
};

export default UploadModal;

import { useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Row, Col, Input, Select, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { extName } from '@/utils/size';
import { FileSelectorModal } from '@/components/FileSelector';
import Title from 'antd/lib/skeleton/Title';

const DataSelector = ({
    value,
    single = true,
    mode,
    accept,
    onChange,
}: {
    value: any;
    single?: boolean;
    mode?: OneSIS.Components.FileSelector.SelectMode;
    accept?: string[];
    onChange: (value: any) => void;
}) => {
    const [acitve, setActive] = useState<string>(isEmpty(2) ? 'server' : 'mapLayer');
    const [curValue, setCurValue] = useState<any>(value);
    const [showFileSelectorModal, setShowFileSelectorModal] = useState<boolean>(false);

    useUpdateEffect(() => {
        console.log(`当前选择文件：${curValue}`);
        onChange?.(curValue);
    }, [curValue]);

    return (
        <Input.Group>
            <Row gutter={8}>
                <Col span={4}>
                    <Select
                        defaultValue={acitve}
                        options={[
                            { label: '服务器数据', value: 'server' },
                            { label: '地图图层', value: 'mapLayer' },
                        ]}
                        onChange={setActive}
                        style={{ width: '100%' }}
                    ></Select>
                </Col>
                <Col span={20}>
                    {acitve === 'server' && (
                        <Input.Group compact>
                            <Input
                                // readOnly
                                value={curValue?.url}
                                style={{ width: 'calc(100% - 50px)' }}
                            />
                            <Button type="primary" onClick={() => setShowFileSelectorModal(true)}>
                                <FolderOpenOutlined />
                            </Button>
                        </Input.Group>
                    )}
                    {acitve === 'mapLayer' && (
                        <Title>none</Title>
                    )}
                </Col>
            </Row>
            {showFileSelectorModal && (
                <FileSelectorModal
                    show={showFileSelectorModal}
                    onCancel={() => setShowFileSelectorModal(false)}
                    defaultViewType={'Card'}
                    mode={mode ?? 'File'}
                    single={single}
                    extensionsFilter={accept}
                    onOk={(selected: any) => {
                        if (!isEmpty(selected)) {
                            const tmp = selected[0];
                            setCurValue({
                                fileName: tmp?.fileName,
                                url: tmp?.url ?? tmp?.fileName,
                                ext: extName(tmp?.fileName).toLowerCase(),
                            });
                        }
                        setShowFileSelectorModal(false);
                    }}
                ></FileSelectorModal>
            )}
        </Input.Group>
    );
};
export default DataSelector;

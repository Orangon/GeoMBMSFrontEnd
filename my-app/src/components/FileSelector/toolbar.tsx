import { useEffect, useContext, useState, useRef } from 'react';
import {
    Dropdown,
    Divider,
    Menu,
    Modal,
    Button,
    Popover,
    Slider,
    Radio,
    message,
    Input,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CommonIconFont from '@/components/CommonIconFont';
import ProForm, { ProFormText } from '@ant-design/pro-form';

import MyContext from '@/components/Context';
import UploadModal from './uploadModal';

import { get, isEmpty, last } from 'lodash';
import { createClient } from 'webdav';

const Toolbar = ({ onTriggerEvent }: { onTriggerEvent: (event: string) => void }) => {
    const myContext: any = useContext(MyContext);
    const { fullPath, selected, clipBoard, viewType, setViewType, iconSize, setIconSize } =
        myContext;
    let refCreateFolderNameInput: any = useRef();
    const [canMontShare, setCanMontShare] = useState<boolean>(false);
    const [selectedSingle, setSelectedSingle] = useState<boolean>(false);
    const [selectedSingleFile, setSelectedSingleFile] = useState<boolean>(false);
    const [selectedMulti, setSelectedMulti] = useState<boolean>(false);
    const [hasFileToPaste, setHasFileToPaste] = useState<boolean>(false);
    const [showWebDavUploadModal, setShowWebDavUploadModal] = useState<boolean>(false);

    useEffect(() => {
        setCanMontShare(!isEmpty(fullPath) && fullPath[0].filename === '/mount');
    }, [fullPath]);

    useEffect(() => {
        setSelectedSingle(selected?.length === 1);
        setSelectedSingleFile(selected?.length === 1 && selected[0].type === 'file');
        setSelectedMulti(selected?.length > 1);
    }, [selected]);

    useEffect(() => {
        setHasFileToPaste(!isEmpty(clipBoard));
    }, [clipBoard]);

    const onBeforeCopyTo = () => {};

    const onBeforeCutTo = () => {};

    const doCreateFolder = () => {
        const modal = Modal.info({});
        modal.update({
            title: '创建文件夹',
            content: (
                <Input
                    placeholder="请输入文件夹名称"
                    style={{ marginTop: 10 }}
                    onChange={(e) => {
                        refCreateFolderNameInput.current = e.target.value;
                    }}
                ></Input>
            ),
            maskClosable: true,
            okText: '确定',
            onOk: async () => {
                const name = refCreateFolderNameInput.current;
                const parentName = get(last(fullPath), 'filename') || '';
                if (!isEmpty(name)) {
                    let client: any = createClient(`${window.appSetting.davApi}`, {});
                    try {
                        await client.createDirectory(`${parentName}/${name}/`);
                        message.success('文件夹创建成功！');
                        onTriggerEvent('reload');
                    } catch (error) {
                        console.log(error);
                        message.error('文件夹创建失败！');
                    } finally {
                        client = null;
                    }
                }
                modal.destroy();
            },
            onCancel: () => {
                modal.destroy();
            },
        });
    };

    return (
        <>
            <Dropdown.Button
                disabled={!canMontShare}
                icon={<DownOutlined></DownOutlined>}
                overlay={
                    <Menu>
                        <Menu.Item key="list">
                            <CommonIconFont type="onesis-liebiao_"></CommonIconFont>
                            装载列表
                        </Menu.Item>
                    </Menu>
                }
            >
                <CommonIconFont type="onesis-wenjianjiayigongxiang"></CommonIconFont>
                装载远程文件夹
            </Dropdown.Button>
            <Divider type="vertical" />
            <Button
                icon={<CommonIconFont type="onesis-folder"></CommonIconFont>}
                onClick={doCreateFolder}
            >
                新建文件夹
            </Button>
            <Divider type="vertical" />
            <Button
                disabled={isEmpty(fullPath)}
                icon={<CommonIconFont type="onesis-shangchuanbendiwenjian"></CommonIconFont>}
                onClick={() => setShowWebDavUploadModal?.(true)}
            >
                上传
            </Button>
            {selectedSingle && (
                <>
                    <Divider type="vertical" />
                    <Button.Group>
                        <Button
                            disabled={!selectedSingle}
                            onClick={() => onTriggerEvent?.('download')}
                        >
                            <CommonIconFont type="onesis-xiazai"></CommonIconFont>
                            下载
                        </Button>
                        <Button disabled={true}>
                            <CommonIconFont type="onesis-A"></CommonIconFont>分享
                        </Button>
                        <Button onClick={() => onTriggerEvent?.('rename')}>
                            <CommonIconFont type="onesis-yunpanlogo--"></CommonIconFont>
                            重命名
                        </Button>
                        <Button onClick={() => onTriggerEvent?.('delete')}>
                            <CommonIconFont type="onesis-shanchu"></CommonIconFont>
                            删除
                        </Button>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="copy" onClick={() => onTriggerEvent?.('copy')}>
                                        <CommonIconFont type="onesis-fuzhi"></CommonIconFont>
                                        复制
                                    </Menu.Item>
                                    <Menu.Item key="cut" onClick={() => onTriggerEvent?.('cut')}>
                                        <CommonIconFont type="onesis-jianqie"></CommonIconFont>
                                        剪切
                                    </Menu.Item>
                                    <Menu.Divider></Menu.Divider>
                                    <Menu.Item key="find" disabled={selectedSingleFile}>
                                        <CommonIconFont type="onesis-sousuo"></CommonIconFont>
                                        在文件夹中查找
                                    </Menu.Item>
                                    <Menu.Divider></Menu.Divider>
                                    <Menu.Item key="star" disabled={true}>
                                        <CommonIconFont type="onesis-shoucang"></CommonIconFont>
                                        添加到收藏夹
                                    </Menu.Item>
                                    <Menu.Item key="copyfile" disabled={!selectedSingleFile}>
                                        <CommonIconFont type="onesis-fuzhi"></CommonIconFont>
                                        创建副本
                                    </Menu.Item>
                                    <Menu.Divider></Menu.Divider>
                                    <Menu.Item key="info">
                                        <CommonIconFont type="onesis-shuxing"></CommonIconFont>
                                        属性
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            <Button>
                                <CommonIconFont type="onesis-gengduox"></CommonIconFont>
                                更多
                                <DownOutlined></DownOutlined>
                            </Button>
                        </Dropdown>
                    </Button.Group>
                </>
            )}
            {selectedMulti && (
                <>
                    <Divider type="vertical" />
                    <Button.Group>
                        <Button onClick={() => onTriggerEvent?.('copy')}>
                            <CommonIconFont type="onesis-fuzhi"></CommonIconFont>
                            复制
                        </Button>
                        <Button onClick={() => onTriggerEvent?.('cut')}>
                            <CommonIconFont type="onesis-jianqie"></CommonIconFont>
                            剪切
                        </Button>
                        <Button>
                            <CommonIconFont type="onesis-xiazai"></CommonIconFont>
                            下载
                        </Button>
                        <Button onClick={() => onTriggerEvent?.('delete')}>
                            <CommonIconFont type="onesis-shanchu"></CommonIconFont>
                            删除
                        </Button>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="copyto" onClick={onBeforeCopyTo}>
                                        <CommonIconFont type="onesis-fuzhi"></CommonIconFont>
                                        复制到...
                                    </Menu.Item>
                                    <Menu.Item key="moveto" onClick={onBeforeCutTo}>
                                        <CommonIconFont type="onesis-jianqie"></CommonIconFont>
                                        移动到...
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            <Button>
                                <CommonIconFont type="onesis-gengduox"></CommonIconFont>
                                更多
                                <DownOutlined></DownOutlined>
                            </Button>
                        </Dropdown>
                    </Button.Group>
                </>
            )}
            {hasFileToPaste && (
                <>
                    <Divider type="vertical" />
                    <Button onClick={() => onTriggerEvent?.('paste')}>
                        <CommonIconFont type="onesis-jurassic_paste"></CommonIconFont>
                        粘贴
                    </Button>
                </>
            )}
            <div style={{ float: 'right' }}>
                {viewType === 'Card' && (
                    <Popover
                        content={
                            <div style={{ height: 200 }}>
                                <Slider
                                    defaultValue={iconSize}
                                    min={20}
                                    max={200}
                                    vertical={true}
                                    onChange={setIconSize}
                                />
                            </div>
                        }
                        trigger="hover"
                    >
                        <Button style={{ marginRight: 10 }}>
                            <CommonIconFont type="onesis-suofangbili"></CommonIconFont>
                        </Button>
                    </Popover>
                )}
                <Radio.Group
                    defaultValue={viewType}
                    onChange={(e: any) => setViewType(e.target.value)}
                >
                    <Radio.Button value={'Table'}>
                        <CommonIconFont type="onesis-liebiao_"></CommonIconFont>
                    </Radio.Button>
                    <Radio.Button value={'Card'}>
                        <CommonIconFont type="onesis-kujialeqiyezhan_sishitucaozuo-"></CommonIconFont>
                    </Radio.Button>
                </Radio.Group>
            </div>
            <UploadModal
                show={showWebDavUploadModal}
                catalog={get(last(fullPath), 'filename')}
                onCancel={(_: any, reload: boolean | undefined) => {
                    setShowWebDavUploadModal(false);
                    if (reload) {
                        onTriggerEvent?.('reload');
                    }
                }}
            ></UploadModal>
        </>
    );
};

const CreateFolder = ({
    show,
    path,
    width,
    bodyStyle,
    onCancel,
}: {
    show: boolean;
    path: string;
    width?: number | string;
    bodyStyle?: any | null;
    onCancel?: (name: string, reload?: boolean) => void;
}) => {
    const [formRef] = ProForm.useForm();

    const doSubmit = async (formData: Record<string, any>) => {
        const { name } = formData;
        if (true) {
            message.success(`创建成功！`);
            onCancel?.(name, true);
        } else {
            message.error(`创建失败，请联系管理员！`);
        }
    };

    return (
        <Modal
            title={'创建文件夹'}
            open={show}
            width={width ?? 1280}
            destroyOnClose={true}
            bodyStyle={bodyStyle ?? { padding: '5px 20px' }}
            footer={false}
            onCancel={() => onCancel?.('', false)}
        >
            <ProForm
                form={formRef}
                layout="horizontal"
                style={{ margin: 30, marginTop: 20 }}
                submitter={{
                    resetButtonProps: {
                        style: { marginLeft: 80 },
                    },
                }}
                onFinish={doSubmit}
            >
                <ProFormText
                    name="name"
                    label="目录名称："
                    rules={[
                        {
                            required: true,
                            message: '请输入目录名称',
                        },
                    ]}
                    placeholder="请输入目录名称"
                />
            </ProForm>
        </Modal>
    );
};

export default Toolbar;

import { useEffect, useState } from 'react';
import { Modal, Space, Radio } from 'antd';

import { InfoCircleOutlined, CodeOutlined } from '@ant-design/icons';
// import CommonIconFont from '@/components/CommonIconFont';

import ModelInfo_Basic from './ModelInfo/Basic';
import ModelInfo_Run from './ModelInfo/Run';

import { fetchModelMetadata } from '@/services/ant-design-pro/api';

import styles from './computation.less';
import { GeoMBMS } from '@/services/ant-design-pro/typings';

const Model = ({ model, task }: { model?: GeoMBMS.Resource; task?: GeoMBMS.Task }) => {
    const [active, setActive] = useState<string>('basic');
    const [metadata, setMetadata] = useState<GeoMBMS.Model.Metadata>();
    const [modelObj, setModelObj] = useState<GeoMBMS.Resource>();

    useEffect(() => {
        if (task) {
            setActive('run');
        }
    }, [task]);

    useEffect(() => {
        if (model?.id) {
            setModelObj(model);
            fetchModelMetadata(model).then(setMetadata);
        }

        // else {
        //     fetchModel(model?.id ?? '').then((obj) => {
        //         setModelObj(obj);
        //         if (model?.id) {
        //             fetchModelMetadata(obj ?? { id: model?.id }).then(setMetadata);
        //         }
        //     });
        // }
    }, [model]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <Radio.Group
                    defaultValue={active}
                    buttonStyle="solid"
                    onChange={(e) => setActive(e.target.value)}
                >
                    <Radio.Button value="basic">
                        <Space>
                            <InfoCircleOutlined />
                            基本信息
                        </Space>
                    </Radio.Button>
                    <Radio.Button value="run">
                        <Space>
                            <CodeOutlined />
                            模型计算
                        </Space>
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div className={styles.container}>
                {active === 'basic' && <ModelInfo_Basic model={metadata} />}
                {/* {active === 'run' && (
                    <ModelInfo_Run model={modelObj} metadata={metadata} task={task} />
                )} */}
            </div>
        </div>
    );
};

const ModelModal = ({
    show,
    width,
    bodyStyle,
    model,
    task,
    onCancel,
}: GeoMBMS.ModalProps & {
    model?: GeoMBMS.Resource;
    task?: GeoMBMS.Task;
}) => {
    if (!show) {
        return null;
    }

    return (
        <Modal
            title={
                <Space>
                    {/* <CommonIconFont type="onesis-mx" /> */}
                    {model?.name ?? '-'}
                </Space>
            }
            className={styles.modalWrapper}
            open={show}
            width={width ?? 1200}
            destroyOnClose={true}
            bodyStyle={bodyStyle ?? { padding: '5px 20px' }}
            footer={false}
            onCancel={() => onCancel?.('', false)}
        >
            <Model model={model} task={task} />
        </Modal>
    );
};
export default Model;
export { ModelModal };

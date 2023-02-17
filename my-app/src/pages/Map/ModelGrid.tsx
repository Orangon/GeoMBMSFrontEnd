import { useState } from 'react';
import { Col, Row } from 'antd';
import ModelCategoryTree from '../ModelCategoryTree/index';
// import { ModelModal } from '@/pages/Computation/computation';

import { isNil } from 'lodash';
import { GeoMBMS } from '@/services/ant-design-pro/typings';
import { ModelModal } from '../Computation/Computation';

const ModelGrid = () => {
    const [showModelToolbox, setShowModelToolbox] = useState<boolean>(true);
    const [selectedModel, setSelectedModel] = useState<GeoMBMS.Resource>();

    // Q2 setSelectedModel如何起作用的？
    return (
        <>
            <Row>
                <Col span={8}>
                    {/* 模型工具框 后续需要开发历史记录组件的时候再改为 ModelToolBox */}
                    <ModelCategoryTree onModelSelected={setSelectedModel}/>
                </Col>
                <Col span={16}>
                    {/* 模型详情 */}
                    {/* {!isNil(selectedModel) && (
                        <ModelModal
                            show={!isNil(selectedModel)}
                            model={selectedModel}
                            onCancel={() => {
                                setSelectedModel(undefined);
                            }}
                        />
                    )} */}
                </Col>
            </Row>
        </>
    );
};
export default ModelGrid;

import { useState } from 'react';
import { Button, Drawer, Input,Popover, Space, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import styles from './index.less';
import { getModelCategoryTree } from '@/services/ant-design-pro/api';
import { GeoMBMS } from '@/services/ant-design-pro/typings';
import { FolderTwoTone, BookTwoTone, HistoryOutlined, ToolOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { first,isEmpty } from 'lodash';

const { Title } = Typography;
const { Search } = Input;

const ModelTooltip = ({ title, desc }: { title: string; desc: string }) => {
  return (
      <Popover
          content={desc}
          title={
              <Space>
                  <BookTwoTone />
                  {title}
              </Space>
          }
          trigger="hover"
          placement="left"
          // overlayClassName={styles.modelToolboxTooltip}
      >
          <p className={styles.modelName}>{title}</p>
      </Popover>
  );
};

const format:any = (node:GeoMBMS.ModelCategory) => {
  return {
      title: node?.name,
      key: node.id,
      icon:<FolderTwoTone />,
      children: (node?.categories ?? []).map(format).concat(
        // 若一级类下有模型，就连接
          node?.models?.map((models) => {
              return {
                  title: (
                    <ModelTooltip
                        title={models?.name ?? ''}
                        desc={models?.description ?? ''}
                    />
                ),
                  key: models.id,
                  icon:<BookTwoTone />,
                  description:models.description,
                  isLeaf: true,
                  originData: models,
              };
          }),
      ),
  };
};
const ModelCategory = await getModelCategoryTree();
const treeData:DataNode[] = ModelCategory.categories.map((item:GeoMBMS.ModelCategory) => format(item));
// const categoriesData: DataNode[] = async()=>{
//   const categoriesRoot = await searchCategoryTree();
//   const targetData = categoriesRoot.categories.map((item) => format(item));
//   return targetData;
// }

const ModelCategoryTree = (
  {onModelSelected}: {onModelSelected?: (model: GeoMBMS.Resource) => void;}
  ) => {

  return (
    <div className={styles.containerTree}>
      <Title level={4}>模型库</Title>
      <Search placeholder="关键词检索" enterButton></Search>
      <Tree
      showIcon
      defaultExpandedKeys={['basic','classification']}
      onSelect={(_, { selectedNodes }) => {
        if (!isEmpty(selectedNodes)) {
          // console.log(first(selectedNodes).originData)
          // Q1 onModelSelected是怎么调用 ModelModal的？
          onModelSelected?.(first(selectedNodes)?.originData as GeoMBMS.Resource);
        }
    }}
      // onCheck={onCheck}
      treeData={treeData}
      />
    </div>
  );
};

const ModelToolbox = ({
  show,
  onClose,
  onModelSelected,
}: {
  show: boolean;
  onClose?: () => void;
  onModelSelected?: (model: GeoMBMS.Resource) => void;
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  return (
      <Drawer
          title={
              <Space>
                  <ToolOutlined />
                  模型工具框
              </Space>
          }
          placement="right"
          closable={false}
          open={show}
          onClose={onClose}
          style={{ marginTop: 48 }}
          bodyStyle={{ padding: 10 }}
          width={370}
          height={`calc(100vh - 248px`}
          headerStyle={{ padding: 10, fontSize: 14 }}
          extra={
              <Space>
                  <Button
                      size="small"
                      type="link"
                      icon={<HistoryOutlined />}
                      onClick={() => setShowHistoryModal(true)}
                  >
                      运行记录
                  </Button>
              </Space>
          }
      >
          <ModelCategoryTree onModelSelected={onModelSelected} />
          {showHistoryModal && (<Space>
            历史记录
          </Space>
              // <ModelRunHistoryModal
              //     show={showHistoryModal}
              //     width="70%"
              //     onCancel={() => setShowHistoryModal(false)}
              // ></ModelRunHistoryModal>
          )}
      </Drawer>
  );
};


export default ModelCategoryTree;
export {ModelToolbox};

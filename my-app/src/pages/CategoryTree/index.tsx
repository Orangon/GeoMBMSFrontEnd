import React from 'react';
import { Input,Popover, Space, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import styles from './index.less';
import { searchCategoryTree } from '@/services/ant-design-pro/api';
import { API } from '@/services/ant-design-pro/typings';
import { FolderTwoTone, BookTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';

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

const format = (node:API.Category) => {
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
const categoriesRoot = await searchCategoryTree();
const categoriesData:DataNode[] = categoriesRoot.categories.map((item) => format(item));
// const categoriesData: DataNode[] = async()=>{
//   const categoriesRoot = await searchCategoryTree();
//   const targetData = categoriesRoot.categories.map((item) => format(item));
//   return targetData;
// }

const CategoryTree: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = async (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <div className={styles.containerTree}>
      <Title level={4}>模型库</Title>
      <Search placeholder="关键词检索" enterButton></Search>
      <Tree
      showIcon
      defaultExpandedKeys={['basic','classification']}
      onSelect={onSelect}
      // onCheck={onCheck}
      treeData={categoriesData}
      />
    </div>
  );
};

export default CategoryTree;

import React from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import styles from './index.less';
import { searchCategoryTree } from '@/services/ant-design-pro/api';
import { API } from '@/services/ant-design-pro/typings';


const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];


const format = (node:API.Category) => {
  return {
      title: node?.name,
      key: node.id,
      children: (node?.categories ?? []).map(format).concat(
        // 若一级类下有模型，就连接
          node?.models?.map((models) => {
              return {
                  title: models?.name,
                  key: models.id,
                  description:models.description,
                  isLeaf: true,
                  originData: models,
              };
          }),
      ),
  };
};
const categoriesRoot = await searchCategoryTree();
const categoriesDate:DataNode[] = categoriesRoot.categories.map((item) => format(item));
// const categoriesData: DataNode[] = async()=>{
//   const categoriesRoot = await searchCategoryTree();
//   const targetData = categoriesRoot.categories.map((item) => format(item));
//   return targetData;
// }

const CategoryTree: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = async (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    const categories = await searchCategoryTree();
    const targetData = categories.categories.map((item) => format(item));
    console.log(targetData)
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <div className={styles.containerTree}>
      <Tree
      // checkable
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      defaultExpandedKeys={['basic','classification']}
      onSelect={onSelect}
      // onCheck={onCheck}
      treeData={categoriesDate}
      />
    </div>
  );
};

export default CategoryTree;

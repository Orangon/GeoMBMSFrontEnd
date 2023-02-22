declare namespace GeoMBMS {
    namespace Model {
        type ViewModel = {} & OneSIS.Category

        type SearchParams = {
            keyword?: string
        }
    }

    type Catalog = {
        // id
        id: string;
        // 名称
        name?: string;
        // 描述
        description?: string;
        // 是否共享
        shared?: boolean;
        // 共享时间
        sharedTime?: date;
        // 创建时间
        createTime?: date;
        // 排序：小值优先
        sort?: number;
        // 所属关系
        relation?: 'OWNER' | 'USER';
    };

    type Category = {
        // id
        id: string;
        // 名称
        name?: string;
        // 上级ID
        parentId?: string;
        // 所属目录树ID
        catalogId?: string;
        // 描述
        description?: string;
        // 创建时间
        createTime?: date;
        // 排序：小值优先
        sort?: number;
        children?: OneSIS.Category[];
        resources?: OneSIS.Resource[];
    };

    type Resource = {
        // id
        id: string;
        // 资源名称
        name?: string;
        // 资源类型
        type?: 'model' | 'data' | 'knowledge' | 'api';
        // 资源创建者
        username?: string;
        // 资源描述
        description?: string;
        // 资源HTTP地址
        url?: string;
        // 创建时间
        createTime?: date;
        // 是否共享
        shared?: boolean;
        // 共享时间
        sharedTime?: date;
        // 资源标签
        tags?: OneSIS.Tag[]
    };

    type Task = {
      id?: string;
      //名称
      name?: string;
      //详细参数
      detail?: any;
      //参数哈希值
      paramHash?: string;
      //状态
      status?:
      'READY'//已准备好
      | 'RUNNING'//运行中
      | 'FINISHED' //正常运行结束
      | 'FAILED' //运行失败
      | 'CANCELLING' //正在取消
      | 'CANCELLED' //已取消
      ;
      //状态消息
      message?: string;
      // 进度
      percentage?: number;
      //任务关联数据编号
      dataId?: string;
      dataUrl?: string;
      //状态类型
      type?: OneSIS.TaskType;
      typeName?: string;
      //创建者
      createdBy?: string;
      //修改者
      updateBy?: string;
      //创建时间
      create?: date;
      //修改时间
      update?: date;
      _links?: {
          self?: {
              href?: string;
          },
          [key: string]: {
              href?: string;
          }
      }
  }
}

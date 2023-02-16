// @ts-ignore
/* eslint-disable */

import { List } from "lodash";

declare namespace GeoMBMS {
  /**
   * 用户注册/登录
   */
  type CurrentUser = {
    id: number;
    username?: string;
    userAccount?:string;
    avatarUrl?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    createTime?:Date;
  };

  type LoginResult = {
    data: any;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    email?:string;
    type?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  /**
   * 建立规则
   */
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    categories: any;
    code:number;
    data:T;
    message:string;
    description:string;
  }

  /**
   * 模型列表
   */
  type ModelCategory = {
    id:stirng;
    name?:string;
    description?:string;
    allModelsrecursive?:List;
    models?:GeoMBMS.Resource[];
    categories?:GeoMBMS.ModelCategory[];
  }

  type Resource = {
    // id
    id: string;
    // 资源名称
    name?: string;
    // 资源描述
    description?: string;
  };

  /**
   * 模型任务
   */
  namespace Model {
    //模型描述文件
    type Metadata = {
        //描述元数据
        meta: any,
        //执行环境、参数
        env: Array<ParamGroup | Param>
    }
  }
  type ModalProps = {
      title?: any;
      show: boolean;
      width?: number | string;
      bodyStyle?: any | null;
      onCancel?: (e: any, reload?: boolean) => void;
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

type TaskType = {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    _links?: {
        self?: {
            href?: string;
        },
        [key: string]: {
            href?: string;
        }
    }
}

  /**
   * 其他
   */
  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

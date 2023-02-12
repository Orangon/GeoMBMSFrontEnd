// @ts-ignore
/* eslint-disable */

import { List } from "lodash";

declare namespace API {
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

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

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

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code:number;
    data:T;
    message:string;
    description:string;
  }

  /**
   * 模型列表
   */
  type Category = {
    id:stirng;
    name?:string;
    description?:string;
    allModelsrecursive?:List;
    models?:API.Resource[];
    categories?:API.Category[];
  }

  type Resource = {
    // id
    id: string;
    // 资源名称
    name?: string;
    // 资源描述
    description?: string;
  };

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

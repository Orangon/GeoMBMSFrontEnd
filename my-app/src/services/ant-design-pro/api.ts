// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { GeoMBMS } from './typings';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.CurrentUser>>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录 POST /api/user/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<number>>('/api/user/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function login(body: GeoMBMS.LoginParams, options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.LoginResult>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /api/user/register */
export async function register(body: GeoMBMS.RegisterParams, options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.RegisterResult>>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /api/user/search */
export async function searchUser(options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.CurrentUser>>('/api/user/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户信息编辑 POST /api/user/edit */
export async function userInfoEdit(body: number, options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<boolean>>('/api/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户逻辑删除 POST /api/user/delete */
export async function userLogicalDelete(body: number, options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询模型资源列表 GET /mbms/category */
export async function getModelCategoryTree(options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.ModelCategory>>('/mbms/category', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 查询模型元数据 GET /mbms/models/{model_id}/ui */
export async function fetchModelMetadata(model: GeoMBMS.Resource, options?: { [key: string]: any }) {
  return request<GeoMBMS.BaseResponse<GeoMBMS.Model.Metadata>>('/mbms/models/'+(model.id)+'/ui', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<GeoMBMS.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<GeoMBMS.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<GeoMBMS.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<GeoMBMS.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

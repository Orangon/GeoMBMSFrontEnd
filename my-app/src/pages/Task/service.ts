import { request } from 'umi';


export async function queryTasks(filter?: any, options?: { [key: string]: any }) {
    return await request<OneSIS.HalPagedResponseType<{
        tasks: OneSIS.TaskType[]
    }>>(`${window.appSetting.gwApi}/computing/tasks`, {
        method: 'GET',
        params: { ...filter },
        ...(options || {}),
    });
}

export async function createTask(body: OneSIS.Task, options?: { [key: string]: any }): Promise<OneSIS.Task> {
    return request<OneSIS.ResponseType<any>>(`${window.appSetting.gwApi}/computing/tasks`, {
        method: 'POST',
        data: { ...body },
        ...(options || {}),
    });
}

export async function updateTask(url: string, body: OneSIS.Task, options?: { [key: string]: any }): Promise<OneSIS.Task> {
    return request<OneSIS.ResponseType<any>>(url ?? `${window.appSetting.gwApi}/computing/tasks/${body?.id}`, {
        method: 'PATCH',
        data: { ...body },
        ...(options || {}),
    });
}

export async function queryTaskTypes(filter?: any, options?: { [key: string]: any }) {
    return await request<OneSIS.HalPagedResponseType<{
        types: OneSIS.TaskType[]
    }>>(`${window.appSetting.gwApi}/computing/types`, {
        method: 'GET',
        params: { ...filter },
        ...(options || {}),
    });
}

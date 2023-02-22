import { createClient, } from 'webdav';
import { isEmpty, compact, endsWith, } from 'lodash';
import { request } from 'umi';
import { extName } from '@/utils/size';

let client = createClient(`${window.appSetting.davApi}`, {});

export const queryList = async ({
    path,
    mode = '',
    extensionsFilter,
}: {
    path: string;
    mode?: string;
    extensionsFilter?: string[];
}) => {
    const directoryItems: any = await client.getDirectoryContents(path);
    let data = { folderList: [], fileList: [] };
    if (!isEmpty(directoryItems)) {
        const lowerExtensionsFilter = compact(extensionsFilter ?? []).map((item) => item.toLowerCase().substring(1));
        data.folderList = directoryItems.filter((item: any) => item.type === 'directory');
        if (['', 'file'].includes(mode)) {
            data.fileList = directoryItems.filter((item: any) => {
                if (isEmpty(lowerExtensionsFilter)) {
                    return item.type === 'file';
                } else {
                    return (
                        item.type === 'file' &&
                        lowerExtensionsFilter.includes(`${extName(item.filename).toLowerCase()}`)
                    );
                }
            });
        }
    }
    return data;
};

export const queryDatas = async ({
    path,
    mode = '',
    extensionsFilter,
}: {
    path: string;
    mode?: string;
    extensionsFilter?: string[];
}) => {
    let result = await request<any[]>(`${window.appSetting.gwApi}/dataEngine/v1.0/api/file/list`, {
        method: 'GET',
        params: { path },
        headers: {
            userId: 'test0'
        }
    });
    return result.map(item => {
        if (item.fileType === 'FOLDER') {
            return {
                ...item,
                url: `${path}${item.fileName}/`
            }
        }
        return item;
    });
    const lowerExtensionsFilter = compact(extensionsFilter ?? []).map((item) => item.toLowerCase().substring(1));
    return (result ?? []).filter(item => {
        if (isEmpty(lowerExtensionsFilter)) {
            return true;
        } else {
            return lowerExtensionsFilter.some(ext => {
                return endsWith(item.fileName, ext);
            });
        }
    })
};

declare namespace OneSIS {
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
}

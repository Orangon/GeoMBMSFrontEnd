import { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { useRecoilState } from 'recoil';
import { modelRunPercentState } from '@/pages/Computation/.Recoil/atom';
import ModelParameters from './Parameters';
import ModelMonitor from './Monitor';
import ModelTask from '../components/task';
import { ModelSuccess, ModelFaild } from '../components/result';
import classNames from 'classnames';
import styles from './index.less';
import { GeoMBMS } from '@/services/ant-design-pro/typings';

const { Step } = Steps;
export default ({
    model,
    metadata,
    task: modelTask,
}: {
    model?: GeoMBMS.Resource;
    metadata?: GeoMBMS.Model.Metadata;
    task?: GeoMBMS.Task;
}) => {
    const [current, setCurrent] = useState<number>(0);
    const [percent, setPercent] = useRecoilState<number>(modelRunPercentState);
    const [runResult, setRunResult] = useState<GeoMBMS.Model.RunResult>({
        status: 'process',
    });
    const [params, setParams] = useState<{ [key: string]: any }[]>([]);
    const [task, setTask] = useState<GeoMBMS.Task>();

    useEffect(() => {
        if (modelTask) {
            setTask(modelTask);
            setParams(modelTask.detail['']);
            if (['READY', 'RUNNING'].includes(modelTask.status ?? '')) {
                setCurrent(2);
            }
            if (
                ['FINISHED', 'FAILED', 'CANCELLING', 'CANCELLED'].includes(modelTask.status ?? '')
            ) {
                setCurrent(3);
            }
        }
    }, [modelTask]);

    return (
        <div className={styles.wrapper}>
            <Steps
                current={current}
                size="small"
                type="navigation"
                percent={percent}
                status={runResult.status}
                style={{ padding: '12px 250px' }}
            >
                <Step title="模型参数设置"></Step>
                <Step title="任务信息设置"></Step>
                <Step title="模型运行"></Step>
                <Step title="运行结果"></Step>
            </Steps>
            <div
                className={classNames(styles.container, {
                    [styles.border]: current === 3,
                })}
            >
                {current === 0 && (
                    <ModelParameters
                        params={params}
                        metadata={metadata}
                        onInit={() => setPercent(0)}
                        onSuccess={(val) => {
                            setParams(val);
                            setCurrent(1);
                        }}
                    ></ModelParameters>
                )}
                {/* {current === 1 && (
                    <ModelTask
                        model={model}
                        metadata={metadata}
                        params={params}
                        onSuccess={(t) => {
                            setPercent(0);
                            setTask(t);
                            setCurrent(2);
                        }}
                        onBack={() => {
                            setPercent(0);
                            setCurrent(0);
                        }}
                    />
                )}
                {current === 2 && (
                    <ModelMonitor
                        task={task}
                        params={params}
                        onStop={(result: GeoMBMS.Model.RunResult) => {
                            setRunResult(result);
                            setPercent(0);
                            setCurrent(3);
                        }}
                        onSuccess={(result: GeoMBMS.Model.RunResult) => {
                            setRunResult(result);
                            if (result.success) {
                                setPercent(0);
                                setCurrent(3);
                            }
                        }}
                    />
                )}
                {current === 3 && (
                    <>
                        {runResult?.success && <ModelSuccess result={runResult} />}
                        {!runResult?.success && (
                            <ModelFaild
                                result={runResult}
                                onRunAgain={() => {
                                    setPercent(0);
                                    setCurrent(0);
                                    setRunResult({
                                        status: 'process',
                                    });
                                }}
                            />
                        )}
                    </>
                )} */}
            </div>
        </div>
    );
};

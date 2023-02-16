import { useContext, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { Breadcrumb as AntBreadcrumb, Button, Input } from 'antd';
import {
    LeftOutlined,
    RightOutlined,
    SwapLeftOutlined,
    SwapRightOutlined,
} from '@ant-design/icons';
import MyContext from '@/components/Context';
import CommonIconFont from '@/components/CommonIconFont';

import { initial, isEmpty, last } from 'lodash';
import smoothscroll from 'smoothscroll-polyfill';

import styles from './breadcrumb.less';

const ButtonGroup = Button.Group;
const Breadcrumb = () => {
    let pathWrapper = useRef<any>();
    const myContext: any = useContext(MyContext);
    const { fullPath, setFullPath }: { fullPath: any[]; setFullPath: any } = myContext;
    const [myBreadCrumbHasScrollBar, setMyBreadCrumbHasScrollBar] = useState<boolean>(false);

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    useEffect(() => {
        if (pathWrapper) {
            const pathWrapperDOM = findDOMNode(pathWrapper.current);
            if (pathWrapperDOM) {
                const _myBreadCrumb = pathWrapperDOM['getElementsByClassName']('ant-breadcrumb')[0];
                if (_myBreadCrumb) {
                    setMyBreadCrumbHasScrollBar(
                        _myBreadCrumb.scrollWidth > _myBreadCrumb.clientWidth,
                    );
                }
            }
        }
    }, [fullPath]);

    const scrollBy = (leftOrRight: number) => {
        if (pathWrapper) {
            const pathWrapperDOM = findDOMNode(pathWrapper.current);
            if (pathWrapperDOM) {
                let _dom = pathWrapperDOM['getElementsByClassName']('ant-breadcrumb')[0];
                if (_dom) {
                    _dom.scrollBy({
                        left: leftOrRight,
                        behavior: 'smooth',
                    });
                }
            }
        }
    };

    const changeBreadcrumb = (num: number) => {
        let _new = [...fullPath];
        if (num < 0) {
            _new = [];
        } else {
            _new = _new.slice(0, num + 1);
        }
        setFullPath(_new);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.history}>
                <ButtonGroup>
                    <Button size="small" disabled>
                        <LeftOutlined></LeftOutlined>
                    </Button>
                    <Button size="small" disabled>
                        <RightOutlined></RightOutlined>
                    </Button>
                </ButtonGroup>
            </div>
            <div className={styles.path} ref={pathWrapper}>
                <div style={{ width: `calc(100% - 45px)` }}>
                    <AntBreadcrumb>
                        <AntBreadcrumb.Item
                            href="javascript:void(0);"
                            onClick={() => changeBreadcrumb(-1)}
                        >
                            <CommonIconFont
                                type="onesis-shouye1"
                                style={{ marginRight: 10 }}
                            ></CommonIconFont>
                            根目录
                        </AntBreadcrumb.Item>
                        {initial(fullPath).map((item: any, index: number) => {
                            return (
                                <AntBreadcrumb.Item
                                    href="javascript:void(0);"
                                    key={`item-${index}`}
                                    onClick={() => changeBreadcrumb(index)}
                                >
                                    <CommonIconFont
                                        type="onesis-folder"
                                        style={{ marginRight: 10 }}
                                    ></CommonIconFont>
                                    <span>{item?.fileName}</span>
                                </AntBreadcrumb.Item>
                            );
                        })}
                        {!isEmpty(fullPath) && (
                            <AntBreadcrumb.Item>
                                <CommonIconFont
                                    type="onesis-folder"
                                    style={{ marginRight: 10 }}
                                ></CommonIconFont>
                                {last(fullPath).fileName}
                            </AntBreadcrumb.Item>
                        )}
                    </AntBreadcrumb>
                </div>
                {myBreadCrumbHasScrollBar && (
                    <div className={styles.scrollTool}>
                        <Button
                            type="link"
                            style={{ marginRight: 5 }}
                            onClick={() => scrollBy(-100)}
                        >
                            <SwapLeftOutlined />
                        </Button>
                        <Button type="link" onClick={() => scrollBy(100)}>
                            <SwapRightOutlined />
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.find}>
                <Input.Search placeholder="查询关键字" enterButton></Input.Search>
            </div>
        </div>
    );
};
export default Breadcrumb;

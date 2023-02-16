import React, { useContext } from 'react';
import { Tooltip, Checkbox, Typography } from 'antd';
import CommonIconFont from '@/components/CommonIconFont';
import MyContext from '@/components/Context';

import { isEmpty } from 'lodash';
import classNames from 'classnames';

import styles from './card.less';
import fileIconStyles from '../fileIcon.less';

const { Title } = Typography;

const CardView = ({
    style,
    single,
    mode,
}: {
    style?: React.CSSProperties;
    single?: boolean | undefined;
    mode?: OneSIS.Components.FileSelector.SelectMode;
}) => {
    const myContext: any = useContext(MyContext);
    const { data, selectedData, setSelectedData, iconSize, onDoubleClickFolder } = myContext;

    const onCheckedChange = (file: any, checked: boolean) => {
        let _new = [...selectedData];
        if (checked) {
            _new.push(file);
        } else {
            if (!isEmpty(_new)) {
                _new = _new.filter((f: any) => f.fileName !== file.fileName);
            }
        }
        setSelectedData(_new);
    };

    const _getMime = (obj: any) => {
        if (obj.fileType === 'FILE') {
            return obj.fileName.substring(obj.fileName.lastIndexOf('.') + 1).toLowerCase();
        } else {
            return '';
        }
    };

    return (
        <div className={styles.wrapper} style={style}>
            {(data ?? []).map((item: any, index: number) => {
                const hasSelected =
                    selectedData.filter((d: any) => item.fileName === d.fileName)?.length > 0;
                const mime = _getMime(item);
                const _checkable: boolean =
                    !single && !(item.fileType === 'FOLDER' && mode !== 'Folder');
                return (
                    <div
                        className={classNames(styles.file, {
                            [styles.selected]: hasSelected,
                        })}
                        key={`file-${index}`}
                        style={{
                            width: iconSize + 10,
                            height: iconSize + 60,
                            padding: 5,
                        }}
                        onClick={() => setSelectedData([item])}
                        onDoubleClick={() => {
                            onDoubleClickFolder?.(item);
                        }}
                    >
                        <Tooltip title={item.basename}>
                            {_checkable && (
                                <div className={styles.itemSelect}>
                                    <Checkbox
                                        checked={hasSelected}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onChange={(e: any) => {
                                            onCheckedChange(item, e.target.checked);
                                            e.stopPropagation();
                                        }}
                                    ></Checkbox>
                                </div>
                            )}
                            {!mime && (
                                <CommonIconFont
                                    type="onesis-folder"
                                    style={{ fontSize: iconSize }}
                                ></CommonIconFont>
                            )}
                            {mime && (
                                <i
                                    className={`${fileIconStyles.fileIcon} ${
                                        fileIconStyles[`x-${mime}`]
                                    }`}
                                    style={{
                                        width: iconSize,
                                        height: iconSize,
                                    }}
                                ></i>
                            )}
                            <div className={styles.itemTitle} style={{ width: iconSize }}>
                                <Title style={{ width: iconSize }} level={5} ellipsis={true}>
                                    {item?.basename ?? item.fileName}
                                </Title>
                            </div>
                        </Tooltip>
                    </div>
                );
            })}
        </div>
    );
};
export default CardView;

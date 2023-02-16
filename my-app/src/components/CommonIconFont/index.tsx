import { createFromIconfontCN } from '@ant-design/icons';
import defaultSettings from '../../../config/defaultSettings';

const CommonIconFont = createFromIconfontCN({
    scriptUrl: [defaultSettings.iconfontUrl || ''],
});

export default CommonIconFont;

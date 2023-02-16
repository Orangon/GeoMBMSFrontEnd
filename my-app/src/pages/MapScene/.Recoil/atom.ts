import { atom } from 'recoil';
import { first } from 'lodash';

const baseMapIdsState = atom({
    key: 'baseMapIdsState',
    default: first(window.baseMapSetting.layers).id,
})

const layersState = atom({
    key: 'layersState',
    default: [] as any[],
});

export { baseMapIdsState, layersState };

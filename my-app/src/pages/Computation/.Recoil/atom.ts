import { atom } from 'recoil';

const modelRunPercentState = atom({
    key: 'modelRunPercentState',
    default: 0,
});

export { modelRunPercentState };

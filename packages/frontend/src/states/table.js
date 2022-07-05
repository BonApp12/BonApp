import {recoilPersist} from "recoil-persist";
import {atom} from "recoil";

const { persistAtom } = recoilPersist();

const tableAtom = atom({
    key: 'table',
    default: null,
    effects_UNSTABLE: [persistAtom]
});

export { tableAtom }
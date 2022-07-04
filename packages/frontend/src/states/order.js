import {recoilPersist} from "recoil-persist";
import {atom} from "recoil";

const { persistAtom } = recoilPersist();

const orderAtom = atom({
    key: 'order',
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export { orderAtom }
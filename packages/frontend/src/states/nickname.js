import {recoilPersist} from "recoil-persist";
import {atom} from "recoil";

const { persistAtom } = recoilPersist();

const nicknameAtom = atom({
    key: 'nickname',
    default: null,
    effects_UNSTABLE: [persistAtom]
});

export { nicknameAtom }
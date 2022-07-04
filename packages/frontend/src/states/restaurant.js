import {recoilPersist} from "recoil-persist";
import {atom} from "recoil";

const { persistAtom } = recoilPersist();

const restaurantAtom = atom({
    key: 'restaurant',
    default: null,
    effects_UNSTABLE: [persistAtom]
});

export { restaurantAtom }
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userAtom = atom({
    key: 'user',
    default: '',
    //persist user in state. It's for reload the page because without that the state is remove
    effects_UNSTABLE: [persistAtom]
});

export { userAtom };
import { atom } from 'recoil';

const userAtom = atom({
    key: 'user',
    // get initial state from local storage to enable user to stay logged in
    default: ''
});

export { userAtom };
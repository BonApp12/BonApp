export default function resetUserConnected(setUserRecoil, history){
    setUserRecoil(null);
    history.push('/');
}
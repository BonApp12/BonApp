export default function resetUserConnected(setUserRecoil, navigate){
    setUserRecoil(null);
    navigate('/');
}
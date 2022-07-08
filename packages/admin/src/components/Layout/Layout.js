import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {AiOutlineHome, AiOutlineLogout, AiOutlineUserAdd} from "react-icons/ai";
import logoutRequest from "../../requests/logoutRequest";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import {toast} from "react-toastify";


const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const setUserRecoil = useSetRecoilState(userAtom);

    const disconnectUser = () => {
        logoutRequest()
            .then(res => {
                if(res.status === 201){
                    toast.success('Vous êtes déconnecté');
                    resetUserConnected(setUserRecoil, navigate);
                }
            })
    }

    return(
        <>
            {location.pathname !== '/login' && (
                <header className={"flex justify-center"}>
                    <div className="absolute top-20">
                        <div className="flex flex-row space-x-3 text-6xl">
                            <button onClick={() => disconnectUser()}>
                                <AiOutlineLogout className={"text-red-500 cursor-pointer"} />
                            </button>
                            {location.pathname === "/dashboard" ? (
                                <Link to={"/add/restaurant"}>
                                    <AiOutlineUserAdd className={"text-blueGray-500 cursor-pointer"}/>
                                </Link>
                            ) : (
                                <Link to={"/dashboard"}>
                                    <AiOutlineHome className={"text-blueGray-500 cursor-pointer"}/>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>
            )}
            <main className="w-full h-full px-4 py-16 mx-auto sm:px-6 lg:px-8 flex items-center justify-center">
                <Outlet />
            </main>
        </>
    )
}
export default Layout;
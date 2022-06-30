import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {userAtom} from '../../states/user';
import {useRecoilValue} from "recoil";
import {BiCog} from "react-icons/bi";
import {AiOutlineCamera} from "react-icons/ai";
import {MdLogout, MdOutlineFastfood} from "react-icons/md";

function Profile() {
    const userState = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        userState === null && navigate('/');
    }, [userState]);

    return (
        <>
            {userState && (
                <>
                    <div className="px-6 py-4 h-full w-full">
                        <div className="flex flex-row space-x-4">
                            <div
                                className="h-[60px] w-[60px] bg-orange-600 flex rounded-lg justify-center items-center">
                                <span
                                    className="text-white font-bold text-xl">{userState?.firstname?.trim().charAt(0).toUpperCase() + userState?.lastname?.trim().charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-2xl font-bold text-black">{userState?.firstname?.charAt(0).toUpperCase() + userState?.firstname?.slice(1)}</p>
                                <p className="text-lg">{userState?.email}</p>
                            </div>
                        </div>
                        <hr className="my-7"/>
                        <div className="flex flex-col space-y-5">
                            <Link className="flex items-center gap-x-4 text-lg font-bold link-box"
                                  to={"/scan"}><AiOutlineCamera size={30}/> Scanner un QR Code</Link>
                            <Link className="flex items-center gap-x-4 text-lg font-bold link-box"
                                  to={"/profile/orders"}><MdOutlineFastfood size={30}/> Mes dernières commandes</Link>
                            <Link className="flex items-center gap-x-4 text-lg font-bold link-box"
                                  to={"/profile/settings"}><BiCog size={30}/> Paramètres du compte</Link>
                            <Link
                                className="flex text-red-600 items-center gap-x-4 text-lg font-bold link-box"
                                to={'/disconnect'}>
                                <MdLogout size={25}/> Déconnexion
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>

    );
}

export default Profile;

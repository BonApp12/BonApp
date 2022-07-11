import React, {useEffect, useState} from "react";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import ValidationSchemaLogin from "../../validations/ValidationSchemaLogin";
import {useRecoilState} from 'recoil';
import {userAtom} from '../../states/user';
import Input from '../../components/Input/Input';
import {toast} from "react-toastify";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaLogin())});
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        userState !== null ? navigate('/profile') : navigate('/');
    }, [userState, navigate]);

    const onSubmit = (data) => {
        setLoading(true);
        LoginWithCredentials(data)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.statusCode === 400 || res.status === 401) {
                    toast.error(res.message);
                } else if (res.statusCode === 200) {
                    toast.success('Connexion réussie');
                    setUserState(res.user);
                    navigate('/profile');
                }
            })
            .catch(() => {
                toast.error('Une erreur est survenue');
            });
    };

    return (
        <>
            <h3 className="text-lg">Connectez-vous !</h3>
            <p className="m-4 text-sm">Vous n'avez pas encore de compte, <Link to="/register"
                                                                               className="text-orange-600">inscrivez-vous</Link> dès
                maintenant</p>
            <form onSubmit={handleSubmit(onSubmit)} className="m-5">
                <Input
                    type="email"
                    name="email"
                    register={{...register('email')}}
                    error={errors?.email?.message}
                    placeHolder="exemple@doe.com"
                />
                <Input
                    type="password"
                    name="password"
                    register={{...register('password')}}
                    error={errors?.password?.message}
                    placeHolder="********"
                />
                <Link to={"/forgot-password"} className="text-sm text-orange-600 flex mt-2 justify-end">Mot de passe
                    oublié ?</Link>
                <button className={`btn-gradient mt-5`}
                        type="submit">{loading ? 'En cours...' : 'Connexion'}</button>
            </form>
            <div className="flex justify-center">
                <GoogleButton setLoadingGoogle={setLoadingGoogle}/>
            </div>
            {
                loadingGoogle && (
                    <div className="absolute w-screen h-screen bg-black/50 top-0 flex justify-center items-center">
                        <AiOutlineLoading3Quarters className="text-white animate-spin" size={80}/>
                    </div>
                )
            }
        </>
    );
}

export default LoginForm;

import {useEffect, useState} from "react";
import Input from "../components/Input/Input";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ValidationSchemaLogin from "../validations/ValidationSchemaLogin";
import {useRecoilState} from "recoil";
import {userAtom} from "../states/user";
import login from "../requests/login";
import {toast} from "react-toastify";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(ValidationSchemaLogin())});
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        userState !== null && navigate('/dashboard');
    }, [userState, navigate]);

    const onSubmit = (user) => {
        setLoading(true);
        login(user)
            .then(res => res.json())
            .then(responseLogin => {
                setLoading(false);
                if ([400, 401].includes(responseLogin.statusCode)) {
                    toast.error(responseLogin.message);
                }
                if (responseLogin.statusCode === 200) {
                    setUserState(responseLogin.user);
                    toast.success("Connexion réussi");
                    console.log(responseLogin);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.response.data.message);
            });
    };

    return (
        <>
            <div className="w-full h-full px-4 py-16 mx-auto sm:px-6 lg:px-8 flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl w-[30rem]">
                    <p className="text-lg font-medium">Espace Admin</p>

                    <Input
                        register={{...register('email')}}
                        error={errors.email}
                        label="Email"
                        type="email"
                        name="email"
                        placeHolder="Votre adresse email"
                    />

                    <Input
                        register={{...register('password')}}
                        error={errors.password}
                        label="Mot de passe"
                        type="password"
                        name="password"
                        placeHolder="Votre mot de passe"
                    />

                    <button type="submit"
                            className={`btn ${loading && 'loading'} border-none block w-full px-5 py-3 text-sm font-medium text-white bg-orange-600 rounded-lg`}>
                        {loading ? 'En cours...' : 'Connexion'}
                    </button>
                </form>
            </div>
        </>
    );
}

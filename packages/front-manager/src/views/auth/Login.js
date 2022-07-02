import React, {useEffect, useState} from "react";
import Input from "../../components/Input/Input";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ValidationSchemaLogin from "../../validations/ValidationSchemaLogin";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import login from "../../requests/login";
import {toast} from "react-toastify";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(ValidationSchemaLogin())});
    const history = useHistory();
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        userState !== null && history.push('/admin');
    }, [userState, history]);

    const onSubmit = (user) => {
        setLoading(true);
        login(user)
            .then(res => res.json())
            .then(responseLogin => {
                setLoading(false);
                if ([400, 401].includes(responseLogin.statusCode)){
                    toast.error(responseLogin.message);
                }
                if (responseLogin.statusCode === 200) {
                    setUserState(responseLogin.user);
                    toast.success("Connexion réussi");
                    history.push('/admin');
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.response.data.message);
            });
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200
            border-0">
                            <div className="flex-auto px-4 lg:px-10 pb-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
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

                                    <div className="text-center mt-6">
                                        <button
                                            className={`btn ${loading && 'loading'} bg-orange-300 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3
                      rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear
                      transition-all duration-150`}
                                            type="submit"
                                        >
                                            {loading ? 'En cours...' : 'Se connecter'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

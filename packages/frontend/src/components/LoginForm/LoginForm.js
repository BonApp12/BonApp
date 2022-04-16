import React, {useState,useEffect} from "react";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useNavigate,Link} from "react-router-dom";
import ValidationSchemaLogin from "../../validations/ValidationSchemaLogin";
import {useRecoilState} from 'recoil';
import {userAtom} from '../../states/user';
import Input from '../Input/Input';
import {toast} from "react-toastify";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaLogin())})
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        userState !== '' && navigate('/already-logged');
    },[userState,navigate]);

    const onSubmit = (data) => {
        setLoading(true);
        LoginWithCredentials(data)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if(res.statusCode === 400 || res.statusCode === 401){
                    setError('auth',{type: 'error', message: res.message});
                }else if(res.statusCode === 200){
                    toast.success('Connexion réussie');
                    setUserState(res.user);
                    navigate('/already-logged');
                }
            })
            .catch(() => {
                toast.error('Une erreur est survenue');
            })

    }

    return (
        <>
            <h3 className="text-lg">Connectez-vous !</h3>
            <p className="m-4 text-sm">Vous n'avez pas encore de compte, <Link to="/register" className="text-orange-600">inscrivez-vous</Link> dès maintenant</p>
            {
                errors?.auth?.message && (
                    <span className="text-sm text-red-500">{errors?.auth?.message}*</span>
                )
            }
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
                <button className={`btn ${loading && 'loading'} btn-primary mt-2 text-white border-none bg-orange-600 hover:bg-orange-500`} type="submit">{loading ? 'En cours...' : 'Connexion'}</button>
            </form>
        </>
    )
}

export default LoginForm;

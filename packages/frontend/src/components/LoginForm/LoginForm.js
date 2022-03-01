import React, {useState,useEffect} from "react";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import isUserConnected from "../../requests/auth/isUserConnected";
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
    },[])

    const onSubmit = (data) => {
        setLoading(true);
        LoginWithCredentials(data)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if(res.statusCode === 400){
                    setError('auth',{
                        type: 'invalidCredentials',
                        message: "L'email ou le mot de passe est incorrect"
                    })
                }else if(res.statusCode === 200){
                    toast.success('Connexion réussie');
                    setUserState(res.user);
                    navigate('/already-logged');
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <h3>Bienvenue, veuillez vous connecter ok.</h3>
            {
                errors?.auth?.message && (
                    <span className="text-sm text-red-500">{errors?.auth?.message}*</span>
                )
            }
            <form onSubmit={handleSubmit(onSubmit)} className="m-5">
                <Input type="email" name="email" register={{...register('email')}} error={errors?.email?.message} placeHolder="exemple@doe.com" />
                <Input type="password" name="password" register={{...register('password')}} error={errors?.password?.message} placeHolder="********"/>
                {
                    loading ? (
                        <button className="btn loading btn-primary mt-2 text-white" type="submit">En cours...</button>
                    ) : (
                        <button className="btn btn-primary mt-2 text-white" type="submit">Connexion</button>
                    )
                }
            </form>
        </>
    )
}

export default LoginForm;

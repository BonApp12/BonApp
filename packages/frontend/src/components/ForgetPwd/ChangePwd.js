import {useSearchParams, useNavigate} from "react-router-dom";
import Input from "../Input/Input";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import checkToken from "../../requests/auth/checkToken";
import {toast} from "react-toastify";
import ValidationSchemaUpdatePwd from "../../validations/ValidationSchemaUpdatePwd";
import updatePwd from "../../requests/auth/updatePwd";

export default function ChangePwd(){
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [location] = useSearchParams();
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaUpdatePwd())});

    const token = location.get('token');

    useEffect(() => {
        checkToken(token).then(res => res.json()).then(res => {
            if(res.statusCode === 401){
                toast.error("Vous n'avez pas accès");
                navigate('/');
            }
        });
    },[])

    const onSubmit = (data) => {
        setLoading(true);
        delete data.confirmPassword;
        data.token = token;
        updatePwd(data)
            .then(res => {
                if(res.status === 204){
                    setLoading(false);
                    toast.success("Mot de passe changé avec succès");
                    navigate('/');
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })

    }

    return (
        <div className="px-5">
            <h3 className="text-lg">Changer votre mot de passe</h3>
            {
                errors?.auth?.message && (
                    <span className="text-sm text-red-500">{errors?.auth?.message}*</span>
                )
            }
            <form onSubmit={handleSubmit(onSubmit)} className="m-2">
                <Input
                    type="password"
                    name="password"
                    register={{...register('password')}}
                    error={errors?.password?.message}
                    placeHolder="Votre mot de passe"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    register={{...register('confirmPassword')}}
                    error={errors?.confirmPassword?.message}
                    placeHolder="Confirmez votre mot de passe"
                />
                <button className={`btn ${loading && 'loading'} btn-primary mt-2 text-white border-none bg-orange-600 hover:bg-orange-500`} type="submit">{loading ? 'En cours...' : 'Modifier'}</button>
            </form>
        </div>
    )
}
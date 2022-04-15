import Input from "../Input/Input";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import ValidationSchemaForgetPwd from "../../validations/ValidationSchemaForgetPwd";
import forgetPassword from "../../requests/auth/forgetPassword";
import {toast} from "react-toastify";

export default function ForgetPwd() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaForgetPwd())});

    const onSubmit = (data) => {
        setLoading(true);
        forgetPassword(data.email)
            .then((res) => {
                setLoading(false);
                if(res.status === 200){
                    toast.success('Une modification de mot de passe a été envoyer par mail');
                    navigate('/');
                }
                return res.json();
            })
            .then(response => {
                if(response.statusCode === 400){
                    setError('auth',{
                        type: "NotExist",
                        message: response.message
                    })
                }
            })
            .catch((e) => {
                setLoading(false);
                setError('auth',{
                    type: "error",
                    message: e.response.data.message
                })
            });
    };

    return (
        <>
            <h3 className="text-lg">Mot de passe oublié</h3>
            <p className="m-1 text-sm">Retour à l'<Link to="/" className="text-orange-600">accueil</Link></p>
            {
                errors?.auth?.message && (
                    <span className="text-sm text-red-500">{errors?.auth?.message}*</span>
                )
            }
            <form onSubmit={handleSubmit(onSubmit)} className="m-2">
                <Input
                    type="text"
                    name="email"
                    register={{...register('email')}}
                    error={errors?.email?.message}
                    placeHolder="Entrez votre email"
                />
                <button className={`btn ${loading && 'loading'} btn-primary mt-2 text-white border-none bg-orange-600 hover:bg-orange-500`} type="submit">{loading ? 'En cours...' : 'Envoyer'}</button>
            </form>
        </>
    )
}
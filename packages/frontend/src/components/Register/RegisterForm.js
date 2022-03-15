import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Input from "../Input/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ValidationSchemaRegisterCustomer from "../../validations/ValidationSchemaRegisterCustomer";
import registerUser from "../../requests/auth/registerUser";
import {toast} from "react-toastify";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaRegisterCustomer())})
    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.role = 'CLIENT';
        setLoading(true);
        registerUser(data)
            .then(res => res.json())
            .then(data => {
                if(data?.statusCode === 422){
                    setLoading(false);
                    setError('register',{
                        type: 'emailAlreadyExist',
                        message: "L'email existe déjà"
                    })
                }else{
                    toast.success('Inscription réussi !');
                    navigate('/');
                }
            })
    }

    return (
        <>
            <h3 className="text-lg">Inscrivez-vous !</h3>
            <p className="my-4 text-sm px-2">Vous possèdez un compte ? <Link to="/login" className="text-orange-500">connectez-vous</Link> dès maintenant</p>
            {
                errors?.register?.message && (
                    <span className="text-sm text-red-500">{errors?.register?.message}*</span>
                )
            }
            <form onSubmit={handleSubmit(onSubmit)} className="m-5">
                <Input
                    type="text"
                    name="firstname"
                    register={{...register('firstname')}}
                    error={errors?.firstname?.message}
                    placeHolder="Entrez votre prénom"
                />
                <Input
                    type="text"
                    name="lastname"
                    register={{...register('lastname')}}
                    error={errors?.lastname?.message}
                    placeHolder="Entrez votre nom"
                />
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
                    placeHolder="Entrez votre mot de passe"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    register={{...register('confirmPassword')}}
                    error={errors?.confirmPassword?.message}
                    placeHolder="Confirmez votre mot de passe"
                />
                <button className={`btn ${loading && 'loading'} btn-primary mt-2 text-white border-none bg-orange-500 hover:bg-orange-400`} type="submit">{loading ? 'En cours...' : 'Inscription'}</button>
            </form>
        </>
    )
}
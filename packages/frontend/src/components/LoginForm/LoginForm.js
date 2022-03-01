import React, {useState} from "react";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import isUserConnected from "../../requests/auth/isUserConnected";
import ValidationSchemaLogin from "../../validations/ValidationSchemaLogin";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaLogin())})
    const navigate = useNavigate();

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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email")} className="input input-bordered" placeholder="exemple@doe.com" name="email" />
                    {
                        errors?.email?.message && (
                            <span className="flex text-sm text-red-500">{errors?.email?.message}*</span>
                        )
                    }
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password")} className="input input-bordered" placeholder="********" name="password" />
                    {
                        errors?.password?.message && (
                            <span className="flex text-sm text-red-500">{errors?.password?.message}*</span>
                        )
                    }
                </div>
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

import React, {useState} from "react";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";
import isUserConnected from "../../requests/auth/isUserConnected";
import ValidationSchemaLogin from "../../validations/ValidationSchemaLogin";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, formState: {errors}} = useForm({resolver: yupResolver(ValidationSchemaLogin())})

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <h3>Bienvenue, veuillez vous connecter ok.</h3>
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
                <button className="btn btn-primary mt-2 text-white" type="submit">Connexion</button>
            </form>
        </>
    )
}

export default LoginForm;

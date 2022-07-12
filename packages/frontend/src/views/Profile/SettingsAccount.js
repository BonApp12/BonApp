import Input from "../../components/Input/Input";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import ValidationSchemaUpdateProfile from "../../validations/ValidationSchemaUpdateProfile";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import updateProfile from "../../requests/users/updateProfile";
import {toast} from "react-toastify";
import profileFields from "../../fields/profileFields";
import HeaderAccount from "../../components/HeaderAccount/HeaderAccount";
import {useNavigate} from "react-router-dom";
import resetUserConnected from "../../helpers/resetUserConnected";

export function SettingsAccount() {
    const [userState, setUserState] = useRecoilState(userAtom);
    const {register, handleSubmit, formState: {errors}, setError, setValue} = useForm({
        defaultValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
        },
        resolver: yupResolver(ValidationSchemaUpdateProfile())
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userState === null && navigate('/');
        return function cleanup() {
            setLoading(false);
        };
    }, [userState]);

    const onSubmit = (user) => {
        //delete property thanks to condition
        Object.keys(user).map(data => {
            if ((data === 'firstname' || data === 'lastname') || (data === 'email' && userState.email === user.email) || (user[data] === '')) delete user[data];
        });
        //set error if oldpassword is missing
        if (!user.oldPassword && user.password) {
            setError('oldPassword', {type: 'missing', message: "Veuillez renseigner l'ancien mot de passe"});
            return 0;
        }
        //set error if password is missing and if oldpassword is populated
        else if (user.oldPassword && !user.password) {
            setError('password', {type: 'missing', message: "Votre mot de passe est requis"});
            return 0;
        }
        if (Object.keys(user).length !== 0) {
            setTimeout(() => {
            }, 1000);
            setLoading(true);
            updateProfile(user)
                .then(res => {
                    if (res.status === 401) {
                        resetUserConnected(setUserState, navigate);
                    } else {
                        return res.json();
                    }
                })
                .then(data => {

                        setLoading(false);
                    if (data !== undefined) {
                        if (data?.statusCode === 422 || data?.statusCode === 400) {
                            let errorMsg = '';
                            if (typeof data.message === "object") data.message.forEach(error => errorMsg += '*' + error + '\n');
                            if (typeof data.message === "string") errorMsg = data.message;
                            toast.error(errorMsg, {autoClose: 6000});
                        } else {
                            delete data.password;
                            setUserState(data);
                            Object.keys(profileFields).forEach(field => (field === 'oldPassword' || field === 'password' || field === 'confirmPassword') && setValue(field, ''));
                            toast.success('✅ Modification réussie !');
                        }
                    }
                });
        }
    };

    return (
        <div className="px-5">
            <HeaderAccount url={'/profile'} title={'Modifier mon compte'}/>
            <form onSubmit={handleSubmit(onSubmit)} className="m-5">
                {Object.keys(profileFields).map((field, index) => (
                    <div key={index}>
                        {field === 'oldPassword' && (<h2 className="mt-5">Mot de passe</h2>)}
                        <Input
                            type={profileFields[field].type}
                            disabled={profileFields[field].disabled}
                            register={{...register(profileFields[field].label)}}
                            error={errors?.[profileFields[field].label]?.message}
                            placeHolder={profileFields[field].placeholder}
                            name={profileFields[field].label}
                        />
                    </div>
                ))}
                <div className="text-right">
                    <button className={`btn-gradient mt-5`}
                            type="submit">{loading ? 'En cours...' : 'Modifier'}</button>
                </div>
            </form>
        </div>
    );
}

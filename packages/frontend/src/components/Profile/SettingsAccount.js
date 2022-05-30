import {useNavigate} from "react-router-dom";
import Input from "../Input/Input";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import ValidationSchemaUpdateProfile from "../../validations/ValidationSchemaUpdateProfile";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import updateProfile from "../../requests/users/updateProfile";
import {toast} from "react-toastify";
import profileFields from "../../fields/profileFields";
import HeaderAccount from "../HeaderAccount/HeaderAccount";

export function SettingsAccount(){
    const [userState, setUserState] = useRecoilState(userAtom);
    const {register, handleSubmit, formState: {errors}, setError, setValue} = useForm({
        defaultValues: {
            firstname: userState.firstname,
            lastname: userState.lastname,
            email: userState.email,
        },
        resolver: yupResolver(ValidationSchemaUpdateProfile())
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (user) => {
        //delete property thanks to condition
        Object.keys(user).map(data => {
            if((data === 'firstname' || data === 'lastname') || (data === 'email' && userState.email === user.email) || (user[data] === '')) delete user[data];
        });
        //set error if oldpassword is missing
        if(!user.oldPassword && user.password) {
            setError('oldPassword', {type: 'missing', message:"Veuillez renseigner l'ancien mot de passe"});
            return 0;
        }
        //set error if password is missing and if oldpassword is populated
        else if(user.oldPassword && !user.password){
            setError('password', {type: 'missing', message:"Votre mot de passe est requis"});
            return 0;
        }
        if(Object.keys(user).length !== 0){
            setLoading(true);
            updateProfile(user)
                .then(res => res.json())
                .then(data => {
                    if(data?.statusCode === 422 || data?.statusCode === 400) {
                        setLoading(false);
                        let errorMsg = '';
                        if (typeof data.message === "object") data.message.forEach(error => errorMsg += '*'+ error + '\n');
                        if (typeof data.message === "string") errorMsg = data.message;
                        toast.error(errorMsg, {autoClose: 6000});
                    }else{
                        setLoading(false);
                        delete data.password;
                        setUserState(data);
                        ['oldPassword','password','confirmPassword'].forEach(field => setValue(field,''));
                        toast.success('✅ Modification réussie !');
                    }
                });
        }
    };

    return (
        <div className="px-5">
            <HeaderAccount url={'/profile'} title={'Modifier mon compte'} />
            <form onSubmit={handleSubmit(onSubmit)} className="m-5">
                {Object.keys(profileFields).map((field,index) => (
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
                <button className={`btn ${loading && 'loading'} btn-primary mt-5 px-10 text-white border-none bg-orange-600 hover:bg-orange-500`} type="submit">{loading ? 'En cours...' : 'Modifier'}</button>
            </form>
        </div>
    )
}
import Input from "../components/Input/Input";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userAtom} from "../states/user";
import {toast} from "react-toastify";
import addRestaurant from "../requests/addRestaurant";
import ValidationSchemaAddRestaurant from "../validations/ValidationSchemaAddRestaurant";
import resetUserConnected from "../helpers/resetUserConnected";
import logoutRequest from "../requests/logoutRequest";

export default function AddRestaurant(){
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(ValidationSchemaAddRestaurant())});
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        if(userState === null){
            logoutRequest()
                .then(res => {
                    if(res.status === 200){
                        resetUserConnected(userState, navigate);
                        toast.error('Vous devez être connecté pour accéder à cette page');
                    }
                });
        }
    }, [userState, navigate]);

    const onSubmit = (userRestaurant) => {
        setLoading(true);
        const user = {...userRestaurant, restaurant: {name: userRestaurant.restaurantName}};
        delete user.restaurantName;
        addRestaurant(user)
            .then(res => {
                setLoading(false);
                if(res.status === 201){
                    toast.success("Restaurant ajouté");
                    navigate('/dashboard');
                }else if(res.status === 400){
                    toast.error("L'utilisateur renseigné possède déjà un restaurant");
                }else if(res.status === 401){
                    resetUserConnected(setUserState, navigate);
                }
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl w-[30rem]">
                <p className="text-lg font-medium">Ajouter un restaurant</p>

                <Input
                    register={{...register('lastname')}}
                    error={errors.lastname}
                    label="Nom"
                    type="text"
                    name="lastname"
                    placeHolder="Votre nom"
                />

                <Input
                    register={{...register('firstname')}}
                    error={errors.firstname}
                    label="Prénom"
                    type="text"
                    name="firstname"
                    placeHolder="Votre prénom"
                />

                <Input
                    register={{...register('email')}}
                    error={errors.email}
                    label="Email"
                    type="email"
                    name="email"
                    placeHolder="Votre email"
                />

                <Input
                    register={{...register('restaurantName')}}
                    error={errors.restaurantName}
                    label="Nom du restaurant"
                    type="text"
                    name="restaurantName"
                    placeHolder="Votre nom de restaurant"
                />

                <button type="submit"
                        className={`border-none block w-full px-5 py-3 text-sm font-medium text-white bg-orange-600 rounded-lg`}>
                    {loading ? 'En cours...' : 'Créer'}
                </button>
            </form>
        </>
    )
}
import * as yup from "yup";

function ValidationSchemaAddRestaurant() {
    return yup.object().shape({
        lastname: yup.string().required("Veuillez entrer votre nom").min(2, "Votre nom doit contenir au moins 2 caractères").max(30, "Votre nom doit contenir au maximum 30 caractères"),
        firstname: yup.string().required("Veuillez entrer votre prénom").min(2, "Votre prénom doit contenir au moins 2 caractères").max(30, "Votre prénom doit contenir au maximum 30 caractères"),
        email: yup.string().required('Votre email est requis').email("L'email n'est pas valide"),
        restaurantName: yup.string().required("Veuillez entrer le nom du restaurant").min(2, "Le nom du restaurant doit contenir au moins 2 caractères").max(30, "Le nom du restaurant doit contenir au maximum 30 caractères"),
    })
}

export default ValidationSchemaAddRestaurant;
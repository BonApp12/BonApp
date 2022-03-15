import * as yup from "yup";

function ValidationSchemaRegisterCustomer() {
    return yup.object().shape({
        firstname: yup.string().required('Votre prénom est requis').min(2,'Votre prénom doit contenir minimum 2 caractères').max(30,'Votre prénom doit contenir maximum 30 caractères'),
        lastname: yup.string().required('Votre nom est requis').min(2,'Votre nom doit contenir minimum 2 caractères').max(50,'Votre nom doit contenir maximum 50 caractères'),
        email: yup.string().required('Votre email est requis').email("L'email n'est pas valide"),
        password: yup.string().required('Votre mot de passe est requis')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/,
            'Votre mot de passe doit contenir minimum 1 chiffre, 1 majuscule, 1 minuscule et au moins 7 caractères'
        ),
        confirmPassword: yup.string().required('La confirmation de mot de passe est requis').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
};

export default ValidationSchemaRegisterCustomer;
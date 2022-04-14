import * as yup from "yup";

function ValidationSchemaRegisterCustomer() {
    return yup.object().shape({
        firstname: yup.string().required('Votre prénom est requis').min(2,'Votre prénom doit contenir minimum 2 caractères').max(30,'Votre prénom doit contenir maximum 30 caractères'),
        lastname: yup.string().required('Votre nom est requis').min(2,'Votre nom doit contenir minimum 2 caractères').max(50,'Votre nom doit contenir maximum 50 caractères'),
        email: yup.string().required('Votre email est requis').email("L'email n'est pas valide"),
        password: yup.string().required('Votre mot de passe est requis')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,15}$/,
            'Votre mot de passe doit contenir au 8 caractères et maximum 15 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmis ceux suivants: #?!@$%^&*-.*'
        ),
        confirmPassword: yup.string().required('La confirmation de mot de passe est requis').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
}

export default ValidationSchemaRegisterCustomer;
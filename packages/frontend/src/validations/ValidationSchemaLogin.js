import * as yup from "yup";

function ValidationSchemaLogin() {
    return yup.object().shape({
        email: yup.string().required('Votre email est requis').email("L'email n'est pas valide"),
        password: yup.string().required('Votre mot de passe est requis')
    })
};

export default ValidationSchemaLogin;
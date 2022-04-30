import * as yup from "yup";

function ValidationSchemaForgetPwd() {
    return yup.object().shape({
        email: yup.string().required('Votre email est requis').email("L'email n'est pas valide"),
    })
}

export default ValidationSchemaForgetPwd;
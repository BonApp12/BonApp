import * as yup from "yup";

function ValidationSchemaUpdateProfile() {
    return yup.object().shape({
        email: yup.string().email("L'email n'est pas valide"),
        oldPassword: yup.string(),
        password: yup.string(),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
}

export default ValidationSchemaUpdateProfile;
import * as yup from "yup";

function ValidationSchemaUpdatePwd() {
    return yup.object().shape({
        password: yup.string().required('Votre mot de passe est requis')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,15}$/,
                'Votre mot de passe doit contenir au moins 8 caractères et maximum 15 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmi ceux suivants: #?!@$%^&*-.*'
            ),
        confirmPassword: yup.string().required('La confirmation du mot de passe est requise').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
}

export default ValidationSchemaUpdatePwd;
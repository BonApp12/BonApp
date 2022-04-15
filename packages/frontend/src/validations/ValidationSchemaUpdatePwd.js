import * as yup from "yup";

function ValidationSchemaUpdatePwd() {
    return yup.object().shape({
        password: yup.string().required('Votre mot de passe est requis')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,15}$/,
                'Votre mot de passe doit contenir au 8 caractères et maximum 15 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmis ceux suivants: #?!@$%^&*-.*'
            ),
        confirmPassword: yup.string().required('La confirmation de mot de passe est requis').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
}

export default ValidationSchemaUpdatePwd;
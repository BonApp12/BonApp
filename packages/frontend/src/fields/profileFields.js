const profileFields = {
    firstname: {
        type: 'string',
        label: 'firstname',
        placeholder: '',
        disabled: true
    },
    lastname: {
        type: 'string',
        label: 'lastname',
        placeholder: '',
        disabled: true
    },
    email: {
        type: 'email',
        label: 'email',
        placeholder: 'exemple@doe.com',
        disabled: false
    },
    oldPassword: {
        type: 'password',
        label: 'oldPassword',
        placeholder: 'Entrez votre ancien mot de passe',
        disabled: false
    },
    password: {
        type: 'password',
        label: 'password',
        placeholder: 'Entrez votre mot de passe',
        disabled: false
    },
    confirmPassword: {
        type: 'password',
        label: 'confirmPassword',
        placeholder: 'Confirmez votre mot de passe',
        disabled: false
    }
}

export default profileFields;
import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
    'Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmis ceux suivants: #?!@$%^&*-.';

const PASSWORD_LENGTH =
    'Votre mot de passe doit contenir au moins 8 caractères et maximum 15 caractères';

const VALIDATION_PIPE = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
    PASSWORD_RULE,
};

export const MESSAGES = {
    PASSWORD_RULE_MESSAGE,
    PASSWORD_LENGTH
};

export const SETTINGS = {
    VALIDATION_PIPE,
};
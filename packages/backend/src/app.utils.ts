import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

const PASSWORD_RULE_MESSAGE =
    'Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmis ceux suivants: #?!@$%^&*-.';

const PASSWORD_LENGTH =
    'Votre mot de passe doit contenir au moins 8 caractères et maximum 15 caractères';

const VALIDATION_PIPE_USER = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

const verifyPassword = (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
};

export const REGEX = {
    PASSWORD_RULE,
};

export const MESSAGES = {
    PASSWORD_RULE_MESSAGE,
    PASSWORD_LENGTH
};

export const SETTINGS = {
    VALIDATION_PIPE_USER,
};

export const UTILS = {
    verifyPassword,
};
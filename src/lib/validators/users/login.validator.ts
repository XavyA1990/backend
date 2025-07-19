import { ERRORS } from "../../constants/labels/labels";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/regex";

export const loginValidation = (email: string, password: string) => {
    if (!email || !password) {
        throw new Error(ERRORS.MISSING_FIELDS);
    }
    
    if (!EMAIL_REGEX.test(email)) {
        throw new Error(ERRORS.INVALID_EMAIL);
    }
    
    if (!PASSWORD_REGEX.test(password)) {
        throw new Error(ERRORS.INVALID_PASSWORD);
    }
    
    return { email, password };
}
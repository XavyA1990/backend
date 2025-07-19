
import { IUser } from "../../../models/user.model";
import { ERRORS } from "../../constants/labels/labels";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/regex";

export const registerValidation = (userData: Omit<IUser, "_id">) => {
    const { first_name, email, password, last_name } = userData;
    if (!first_name || !email || !password || !last_name) {
        throw new Error(ERRORS.MISSING_FIELDS);
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new Error(ERRORS.INVALID_EMAIL);
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new Error(ERRORS.INVALID_PASSWORD);
    }

    return userData;
}


import { IUser } from "../../../models/user.model";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/regex";

const userValidation = (userData: Omit<IUser, "_id">) => {
    const { first_name, email, password, last_name } = userData;
    if (!first_name || !email || !password || !last_name) {
        throw new Error("Missing required user fields");
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new Error("Invalid email format");
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new Error("Invalid password format");
    }

    return userData;
}

export default userValidation;

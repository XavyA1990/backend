
import { IUser } from "../../../models/user.model";

const isValidUserData = (userData: Omit<IUser, "_id">) => {
    const { first_name, email, password, last_name } = userData;
    if (!first_name || !email || !password || !last_name) {
        throw new Error("Missing required user fields");
    }

    return true;
}

export default isValidUserData;

import { registerValidation } from "../lib/validators/users/register.validator";
import User, { IUser } from "../models/user.model";
import { BcryptAdapterImpl } from "../config/plugins/bcrypt.plugin";
import { JwtAdapterImpl } from "../config/plugins/jwt.plugin";
import { ENVS } from "../config/envs";
import { ERRORS } from "../lib/constants/labels";

export const registerUser = async (userData: Omit<IUser, "_id">) => {
  try {
    const validUser = registerValidation(userData);

    if (await getUserByEmail(validUser.email)) {
      throw new Error(ERRORS.USER_EXISTS);
    }

    const { password, ...rest } = validUser;

    const bcryptAdapter = new BcryptAdapterImpl();

    const hashedPassword = await bcryptAdapter.hash(password);

    const user = new User({ ...rest, password: hashedPassword });
    await user.save();
    const jwtAdapter = new JwtAdapterImpl(ENVS.JWT_SECRET);
    const token = jwtAdapter.sign({ id: user._id, email: user.email });

    return { data: { user, token } };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERRORS.ERROR_REGISTERING_USER);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERRORS.ERROR_FETCHING_USER);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    
  } catch (error) {
    
  }
}

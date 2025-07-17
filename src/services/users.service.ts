import isValidUserData from "../lib/validators/users/register-user.validator";
import User, { IUser } from "../models/user.model";
import { BcryptAdapterImpl } from "../config/plugins/bcrypt.plugin";
import { JwtAdapterImpl } from "../config/plugins/jwt.plugin";
import { ENVS } from "../config/envs";

export const registerUser = async (userData: Omit<IUser, "_id">) => {
  try {
    isValidUserData(userData);

    const { password, ...rest } = userData;

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
    throw new Error("Error registering user");
  }
};

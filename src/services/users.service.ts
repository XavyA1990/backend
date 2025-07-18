import { registerValidation } from "../lib/validators/users/register.validator";
import User, { IUser } from "../models/user.model";
import { BcryptAdapterImpl } from "../config/plugins/bcrypt.plugin";
import { JwtAdapterImpl } from "../config/plugins/jwt.plugin";
import { ENVS } from "../config/envs";
import { ERRORS } from "../lib/constants/labels";
import { loginValidation } from "../lib/validators/users/login.validator";
import { Types } from "mongoose";
import { updateValidation } from "../lib/validators/users/update.validator";
import fs from "fs";
import path from "path";
import { FileUploadPlugin } from "../config/plugins/file-uploads.plugin";

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

export const getUserById = async (id: Types.ObjectId) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) throw new Error(ERRORS.USER_NOT_FOUND);
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
    const validUser = loginValidation(email, password);
    const existingUser = await getUserByEmail(validUser.email);

    if (!existingUser) throw new Error(ERRORS.USER_NOT_FOUND);

    const bcryptAdapter = new BcryptAdapterImpl();

    const isPasswordValid = await bcryptAdapter.compare(
      validUser.password,
      existingUser.password
    );

    if (!isPasswordValid) throw new Error(ERRORS.INCORRECT_CREDENTIALS);

    const jwtAdapter = new JwtAdapterImpl(ENVS.JWT_SECRET);
    const token = jwtAdapter.sign({
      id: existingUser._id,
      email: existingUser.email,
    });
    return { data: { user: existingUser, token } };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERRORS.ERROR_FETCHING_USER);
  }
};

export const updateUser = async (
  id: Types.ObjectId,
  userData: Partial<IUser>,
  confirmPassword?: string
) => {
  try {
    const validUserData = updateValidation(userData, id, confirmPassword);

    const user = await getUserById(id);

    if (user.avatar_image_url && validUserData.avatar_image_url) {
      new FileUploadPlugin("public/" + user.avatar_image_url).removeFile();
    }

    if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

    if (validUserData.password) {
      const bcryptAdapter = new BcryptAdapterImpl();
      validUserData.password = await bcryptAdapter.hash(validUserData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, validUserData, {
      runValidators: true,
      new: true,
    }).exec();

    if (!updatedUser) throw new Error(ERRORS.ERROR_UPDATING_USER);

    const jwtAdapter = new JwtAdapterImpl(ENVS.JWT_SECRET);
    const token = jwtAdapter.sign({
      id: updatedUser!._id,
      email: updatedUser!.email,
    });

    return { data: updatedUser, token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(ERRORS.ERROR_UPDATING_USER);
  }
};

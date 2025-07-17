import User, { IUser } from "../models/user.model";

export const registerUser = async (userData: Omit<IUser, "_id">) => {
    
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error("Error registering user");
  }
};

import { Types } from "mongoose";
import { IUser } from "../../../models/user.model";
import { ERRORS } from "../../constants/labels";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/regex";

export const updateValidation = (
  userData: Partial<IUser>,
  id: Types.ObjectId,
  confirmPassword?: string
) => {
  const { email, password } = userData;

  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error(ERRORS.INVALID_USER_ID);
  }

  if (confirmPassword && !PASSWORD_REGEX.test(confirmPassword)) {
    throw new Error(ERRORS.INVALID_PASSWORD);
  }
  
  if (password && !PASSWORD_REGEX.test(password)) {
    throw new Error(ERRORS.INVALID_PASSWORD);
  }
  
  if (password && confirmPassword && password !== confirmPassword) {
    throw new Error(ERRORS.PASSWORD_DOES_NOT_MATCH);
  }

  if (password && !confirmPassword) {
    throw new Error(ERRORS.MISSING_FIELDS);
  }

  if (email && !EMAIL_REGEX.test(email)) {
    throw new Error(ERRORS.INVALID_EMAIL);
  }


  return userData;
};

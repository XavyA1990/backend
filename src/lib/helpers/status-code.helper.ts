import { SUCCESS, ERRORS } from "../constants/labels/labels";

export const handleStatusCode = (message: string) => {
  switch (message) {
    case SUCCESS.USER_LOGGED_IN:
    case SUCCESS.USER_UPDATED:
    case SUCCESS.BOARD_UPDATED:
    case SUCCESS.BOARD_DELETED:
      return 200;
    case SUCCESS.USER_REGISTERED:
    case SUCCESS.BOARD_CREATED:
      return 201;
    case ERRORS.INVALID_EMAIL:
    case ERRORS.INVALID_PASSWORD:
    case ERRORS.MISSING_FIELDS:
    case ERRORS.INVALID_OWNER_ID:
    case ERRORS.INVALID_MEMBER_ID:
      return 400;
    case ERRORS.INVALID_USER_ID:
      return 400;
    case ERRORS.INCORRECT_CREDENTIALS:
      return 401;
    case ERRORS.USER_NOT_FOUND:
      return 404;
    case ERRORS.USER_EXISTS:
    case ERRORS.MEMBER_CANNOT_BE_OWNER:
    case ERRORS.MEMBERS_MUST_BE_UNIQUE:
      return 409;
    case ERRORS.PASSWORD_DOES_NOT_MATCH:
    case ERRORS.MISSING_TITLE:
      return 422;
    case ERRORS.ERROR_REGISTERING_USER:
    case ERRORS.ERROR_FETCHING_USER:
    case ERRORS.UNKNOWN_BOARD_ERROR:
      return 500;
    default:
      return 500;
  }
};

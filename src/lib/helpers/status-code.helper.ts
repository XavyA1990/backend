import { SUCCESS, ERRORS } from "../constants/labels/labels"


export const handleStatusCode = (message: string) => {
  switch (message) {
    case SUCCESS.USER_LOGGED_IN:
    case SUCCESS.USER_UPDATED:
      return 200;
    case SUCCESS.USER_REGISTERED:
      return 201;
    case ERRORS.INVALID_EMAIL:
    case ERRORS.INVALID_PASSWORD:
    case ERRORS.MISSING_FIELDS:
      return 400;
    case ERRORS.PASSWORD_DOES_NOT_MATCH:
      return 422;
    case ERRORS.INVALID_USER_ID:
      return 400;
    case ERRORS.INCORRECT_CREDENTIALS:
      return 401;
    case ERRORS.USER_NOT_FOUND:
      return 404;
    case ERRORS.USER_EXISTS:
      return 409;
    case ERRORS.ERROR_REGISTERING_USER:
    case ERRORS.ERROR_FETCHING_USER:
      return 500;
    default:
      return 500;
  }
}
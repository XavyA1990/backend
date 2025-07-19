import { BOARD_ERRORS, BOARD_SUCCESS } from "./board.label";
import { USER_ERRORS, USER_SUCCESS } from "./user.label";

export const ERRORS = {
    ...USER_ERRORS,
    ...BOARD_ERRORS
};

export const SUCCESS = {
    ...USER_SUCCESS,
    ...BOARD_SUCCESS
};
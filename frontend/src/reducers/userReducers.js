import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

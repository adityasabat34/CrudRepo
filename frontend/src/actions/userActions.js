import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from '../constants/userConstants';
import axios from 'axios';

export const createUser = (name, email, age) => async (dispatch) => {
  try {
    dispatch({ type: USER_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/user/`,
      { name, email, age },
      config
    );

    dispatch({ type: USER_CREATE_SUCCESS, payload: data });

    localStorage.setItem('userData', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

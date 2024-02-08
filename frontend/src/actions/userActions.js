import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
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

    dispatch({ type: USER_CREATE_SUCCESS });

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

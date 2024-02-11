import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
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
      `/api/users/`,
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

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await axios.get(`/api/users`);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/users/${id}`);

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getUserInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/users/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

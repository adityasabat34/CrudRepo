import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { userCreateReducer } from './reducers/userReducers';

const reducer = combineReducers({
  userCreate: userCreateReducer,
});

const userDataFromStorage = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : {};

const initialState = {
  userCreate: { userData: userDataFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

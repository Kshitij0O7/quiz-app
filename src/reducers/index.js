import { combineReducers } from 'redux';
import users from './user';
import questions from './questions';
export const reducers = combineReducers({ users, questions });
import { FETCH_QUESTIONS, ADD_QUESTION } from '../constants/actionTypes';

export default (questions = [], action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return action.payload;
    case ADD_QUESTION:
      return [...questions, action.payload];
   default:
      return questions;
  }
};
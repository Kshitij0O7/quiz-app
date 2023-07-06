import { FETCH_QUESTIONS, ADD_QUESTION } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getQuestions = (token) => async (dispatch) => {
  try {
    const { data } = await api.fetchQustions(token);
    
    dispatch({ type: FETCH_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await api.addQuestion(question);

    dispatch({ type: ADD_QUESTION, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


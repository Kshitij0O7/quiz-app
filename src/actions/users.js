import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersByDepartment = () => async (dispatch) => {
    try {
      const { data } = await api.fetchUsersByDepartment();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.addUser(user);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateScore = (email, answers) => async (dispatch) => {
  try {
    const { data } = await api.updateScore(email, answers);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const likePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await api.deletePost(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

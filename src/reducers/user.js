import { FETCH_ALL, CREATE, UPDATE} from '../constants/actionTypes';

export default (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    // case LIKE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...users, action.payload];
    case UPDATE:
      return users.map((user) => (user.email === action.payload.email ? action.payload : users));
    // case DELETE:
    //   return posts.filter((post) => post._id !== action.payload);
    default:
      return users;
  }
};
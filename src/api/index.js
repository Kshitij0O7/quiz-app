import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchUsers = () => axios.get(`${url}/user`);
export const fetchUsersByDepartment = (department) => axios.get(`${url}/user/${department}`)
export const addUser = (newUser) => axios.post(`${url}/user`, newUser);
export const fetchQustions = (department) => axios.get(`${url}/question/${department}`);
export const addQuestion = (newQuestion) => axios.post(`${url}/question`, newQuestion);
export const updateScore = (email, answers) => axios.patch(`${url}/user/${email}`, answers);

// export const deletePost = (id) => axios.delete(`${url}/${id}`);
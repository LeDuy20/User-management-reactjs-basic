import axios from "./customize-axios";

const UserService = (page) => {
  return (
    axios.get(`/api/users?page=${page}`)
  )
};
const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name, job })
};
const putUpdateUser = (name, job) => {
  return axios.put("/api/users", { name, job })
};
const deleteUserUser = (id) => {
  return axios.delete(`/api/users/${id}`)
};
const loginApi = (email, password) => {
  return axios.post("/api/login", { email, password })
}
export { UserService, postCreateUser, putUpdateUser, deleteUserUser, loginApi }
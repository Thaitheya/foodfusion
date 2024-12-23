import axios from "axios";

export const getUser = () => {
  sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;
};

export const login = async (email, password) => {
  const { data } = await axios.post("api/users/login", { email, password });
  sessionStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register =  async registerData => {
  const {data} = await axios.post('api/users/register', registerData);
  sessionStorage.setItem('user',JSON.stringify(data));
  return data;
}

export const logout = () => {
  sessionStorage.removeItem("user");
};

import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const createContact = async (newContact) => {
  // const request = axios.post(baseURL, newContact);
  // return request.then((res) => res.data);
  return axios.post(baseURL, newContact).then((res) => res.data);
};

const deleteContact = async (id) => {
  const request = await axios.delete(`${baseURL}/${id}`);
  return request.data;
};

const updateContact = async (id, newObject) => {
  const request = await axios.put(`${baseURL}/${id}`, newObject);
  //   console.log("updateContact's response is ", request.data);
  return request.data;
};

export default { getAll, createContact, deleteContact, updateContact };

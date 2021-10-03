import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const createContact = async (newContact) => {
  newContact = {
    ...newContact,
    id: Math.round(Math.random() * 10000),
  };
  const request = axios.post(baseURL, newContact);
  return request.then((res) => res.data);
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

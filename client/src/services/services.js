import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const service_getTodo = () => {
  return axios.get('/todos')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error('Error fetching todos:', err.message);
      throw err;
    })
};


const service_addTodo = (e) => {
  return axios.post('/add', { todo: e })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error('Error add todos:', err.message);
      throw err;
    })
}

const service_deleteTodo = (e) => {

  return axios.delete('/delete', { data: { id: e } })
    .then((res) => {
      return res;
    })
    .catch(err => {
      console.error('Error delete todos:', err.message);
      throw err;
    })
}

export { service_getTodo, service_addTodo, service_deleteTodo };


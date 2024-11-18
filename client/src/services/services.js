import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const service_getTodo = async () => {
  try {
    const response = await axios.get('/todos'); // 等待请求完成
    return response.data; // 返回实际的数据部分
  } catch (err) {
    console.error('Error fetching todos:', err.message);
    throw err; // 抛出错误给调用方处理
  }
};


const service_addTodo = async (e) => {
  const data = {
    todo: e
  }
  try {
    const res = await axios.post('/add', data);
    return res;
  } catch (err) {
    console.error('Error add todos:', err.message);
    throw err;
  }
}

const service_deleteTodo = async (e) => {
  try {
    const res = await axios.delete('/delete', {
      data: { id: e }
    });
    return res;
  } catch (err) {
    console.error('Error delete todos:', err.message);
    throw err;
  }
}

export { service_getTodo, service_addTodo, service_deleteTodo };


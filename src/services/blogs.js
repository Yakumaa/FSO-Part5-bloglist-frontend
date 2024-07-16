import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    console.log(config)
    console.log('Creating a new blog with:', newObject);
    const response = await axios.post(baseUrl, newObject, config);
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // Request made but no response received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
};

export default { getAll, create, setToken }
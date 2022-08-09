import axios from 'axios';

import routes from '../routes.js';

const fetchData = async (getAuthHeader) => {
  const response = await axios.get(routes.data(), { headers: getAuthHeader() });
  return response.data;
};

export default fetchData;

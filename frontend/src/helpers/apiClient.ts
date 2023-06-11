import axios, { AxiosRequestConfig } from 'axios';

// default
axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3003/api';
// content type
axios.defaults.headers.common['Content-Type'] = 'application/json';

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let errorResponse = '';

    if (error.response && error.response.data) {
      if (
        error.response.status <= 500 && error.response.status >= 400
      ) {
        errorResponse = error.response.data.message;
      }
    } else {
      errorResponse = 'Network error';
    }
    return Promise.reject(errorResponse);
  },
);

const setAuthorization = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

const setContentType = (value: any) => {
  axios.defaults.headers.common['Content-Type'] = value;
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const checkAuthorization = () => {
  if (axios.defaults.headers.common['Authorization']) {
    return true;
  } else {
    return false;
  }
};

class APIClient {
  /**
   * Fetch data from given url
   */
  get = (url: string, config: AxiosRequestConfig = {}) => {
    return axios.get(url, config);
  };

  /**
   * post given data to url
   */
  post = (url: string, data: any, config: AxiosRequestConfig = {}) => {
    return axios.post(url, data, config);
  };

  /**
   * Update data to url
   */
  update = (url: string, data: any, config: AxiosRequestConfig = {}) => {
    return axios.patch(url, data, config);
  };

  /**
   * Delete data from url
   */
  remove = (url: string, config: AxiosRequestConfig = {}) => {
    axios.delete(url, config);
  };
}

const get = new APIClient().get;
const post = new APIClient().post;
const update = new APIClient().update;
const remove = new APIClient().remove;

export {
  APIClient,
  get,
  post,
  update,
  remove,
  setContentType,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
};
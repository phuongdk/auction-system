import axios, { AxiosRequestConfig } from 'axios';

// default
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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
        error.response.status === 400 &&
        Array.isArray(error.response.data.errors)
      ) {
        errorResponse = error.response.data.errors;
      } else if (error.response.status === 404) {
        errorResponse = 'request_not_found';
      } else {
        errorResponse = error.response.data.translationCode;
      }
    } else {
      errorResponse = 'network_error';
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
  post = (url: string, config: AxiosRequestConfig = {}) => {
    return axios.post(url, config);
  };

  /**
   * Update data to url
   */
  update = (url: string, config: AxiosRequestConfig = {}) => {
    return axios.patch(url, config);
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
import axios, {AxiosResponse} from 'axios';

const instance = axios.create();

const request = async (url: string, body: any) => {
  const response = await instance.post(url, body, {
    withCredentials: true,
  });
  return response;
};

const fetchClient = async <T extends unknown>(
  url: string,
  body = {},
): Promise<AxiosResponse<T>> => {
  const fullUrl = `${location.protocol}//${location.host}${url}`;
  let response = await request(fullUrl, body);
  if (response.data.errorCode === 'E1177') {
    window.location.href = '/login';
  }
  if (response.data.errorCode === 'E1112') {
    // access token has been updated in the cookie, re-submit the request
    response = await request(fullUrl, body);
  }
  return response;
};

export default fetchClient;

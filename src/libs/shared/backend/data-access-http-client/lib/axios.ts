import { CONFIG } from '@libs/shared/data-access-config';
import Axios, {
  InternalAxiosRequestConfig,
  registerGlobalInterceptors,
} from '@libs/shared/external-lib/axios';

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  config.headers = config.headers || {};
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

const AXIOS_CONFIG = {
  baseURL: CONFIG.API_URL,
};

const httpClient = Axios.create(AXIOS_CONFIG);

httpClient.interceptors.request.use(authRequestInterceptor);
registerGlobalInterceptors(httpClient);

const httpClientSnakeCase = Axios.create(AXIOS_CONFIG);
httpClientSnakeCase.interceptors.request.use(authRequestInterceptor);

registerGlobalInterceptors(httpClientSnakeCase, {
  transformToCamelCase: false,
});

export { httpClient, httpClientSnakeCase };

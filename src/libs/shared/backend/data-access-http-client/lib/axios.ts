import { CONFIG } from '@libs/shared/data-access-config';
import Axios, {
  InternalAxiosRequestConfig,
  registerGlobalInterceptors,
} from '@libs/shared/external-lib/axios';

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = CONFIG.AUTHORIZATION;
  config.headers = config.headers || {};
  if (token && CONFIG.DEV) {
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

import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import {
  camelToSnakeCase,
  convertToCamelCase,
  convertToSnakeCase,
} from '@libs/shared/utils/transformation';
import { AxiosInstance } from 'axios';

interface InterceptorsConfig {
  transformToCamelCase?: boolean;
}

export function registerGlobalInterceptors(
  instance: AxiosInstance,
  config: InterceptorsConfig = {
    transformToCamelCase: true,
  }
): void {
  instance.interceptors.request.use(acceptReqInterceptor);
  instance.interceptors.request.use(convertToSnakeCaseReqInterceptor);
  if (config.transformToCamelCase) {
    instance.interceptors.response.use(convertToCamelCaseResInterceptor);
  }
}

function acceptReqInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  config.headers.Accept = 'application/json';
  return config;
}

function convertToSnakeCaseReqInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  config.headers = config.headers || {};
  if (config.headers.KeepCamelCase) {
    delete config.headers.KeepCamelCase;
    return config;
  }

  if (config.data instanceof FormData) {
    const newFormData = new FormData();
    const formData = config.data as FormData;
    formData.forEach((value: FormDataEntryValue, key: string) => {
      const snakeKey = camelToSnakeCase(key);
      newFormData.append(snakeKey, value);
    });
    config.data = newFormData;
    return config;
  }

  if (config.data) {
    config.data = convertToSnakeCase(config.data);
  }

  return config;
}

function convertToCamelCaseResInterceptor(
  response: AxiosResponse
): AxiosResponse {
  return convertToCamelCase(response.data) as AxiosResponse;
}

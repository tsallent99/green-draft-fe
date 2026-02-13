import { AxiosError } from '../axios';

export const getAxiosErrorMessage = (
  error: AxiosError<{ message: string; fields?: any[] }>
): string | string[] => {
  if (error.response?.status === 500) {
    return error.response?.data?.message || error.message;
  } else if (error.response?.data?.fields) {
    return error.response.data.fields.map((field: any) => {
      if (field?.name && field?.message)
        return `${field.name}: ${field.message}`;
      else return 'Ha ocurrido un error inesperado';
    });
  }
  return error.response?.data?.message || 'Ha ocurrido un error inesperado';
};

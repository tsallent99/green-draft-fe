export const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  DEV: process.env.NODE_ENV === 'development',
  MODE: process.env.NODE_ENV,
  AUTHORIZATION: process.env.REACT_APP_AUTHORIZATION || '',
} as const;

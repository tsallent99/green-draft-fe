/* eslint-disable @typescript-eslint/no-empty-function */
import {
  StoreApi,
  createStore as createZustandStore,
  useStore as useZustandStore,
} from 'zustand';

export { type StoreApi };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStoreApi = <T>(value: any): value is StoreApi<T> => {
  return (
    value &&
    typeof value.getState === 'function' &&
    typeof value.setState === 'function'
  );
};

export const createDummyStore = <T>(value: T): StoreApi<T> => ({
  getState: () => value,
  setState: () => {},
  getInitialState: () => value,
  subscribe: () => () => {},
});

export const createStore = createZustandStore;

export const useStore = useZustandStore;

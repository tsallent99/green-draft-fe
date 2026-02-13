import { httpClient } from '@libs/shared/backend/data-access-http-client';
import {
  EntryUpdateDtoT,
  EntryResponseDtoT,
  entryResponseDtoSchema,
} from './api.dto';
import { z } from 'zod';

const BASE_URL = '/entries';

export const entryApi = {
  getMyEntries: async (): Promise<EntryResponseDtoT[]> => {
    const response = await httpClient.get(`${BASE_URL}/my-entries`);
    const validation = z.array(entryResponseDtoSchema).safeParse(response.data);
    if (!validation.success) {
      throw new Error('Invalid response from server');
    }
    return validation.data;
  },

  getEntryById: async (entryId: number): Promise<EntryResponseDtoT> => {
    const response = await httpClient.get(`${BASE_URL}/${entryId}`);
    const validation = entryResponseDtoSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error('Invalid response from server');
    }
    return validation.data;
  },

  updateEntry: async (
    entryId: number,
    data: EntryUpdateDtoT
  ): Promise<EntryResponseDtoT> => {
    const response = await httpClient.patch(`${BASE_URL}/${entryId}`, data);
    const validation = entryResponseDtoSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error('Invalid response from server');
    }
    return validation.data;
  },

  deleteEntry: async (entryId: number): Promise<void> => {
    await httpClient.delete(`${BASE_URL}/${entryId}`);
  },
};

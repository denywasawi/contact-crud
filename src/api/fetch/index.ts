import { BaseResponse, ContactType } from "@/types";
import { httpClient } from "../config/httpClient";

const endpoint = "/contact";

// GET LIST CONTACT
export const getListContactApi =
  async (): Promise<BaseResponse<ContactType[]>> => {
    return await httpClient.get(endpoint);
  };

// CREATE CONTACT
export const createContactApi =
  async (payload: ContactType): Promise<never> => {
    return await httpClient.post(endpoint, payload);
  };

// UPDATE CONTACT
export const updateContactApi =
  async (payload: ContactType, id: string): Promise<never> => {
    return await httpClient.put(`${endpoint}/${id}`, payload);
  };

// GET DETAIL CONTACT
export const getDetailContactApi =
  async (id: string): Promise<BaseResponse<ContactType>> => {
    return await httpClient.get(`${endpoint}/${id}`);
  };

// DELETE CONTACT
export const deleteContactApi =
  async (id: string): Promise<never> => {
    return await httpClient.delete(`${endpoint}/${id}`);
  };
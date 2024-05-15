import axios from "axios";

export const httpClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

httpClient.interceptors.response.use(
  async response => {
    return Promise.resolve(response.data);
  },
)


import { AxiosResponse } from 'axios';

export const extractData = <T>(response: AxiosResponse) => response.data ? response.data : [];

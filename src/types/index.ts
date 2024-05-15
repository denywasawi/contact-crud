export interface BaseResponse<T> {
  message: string;
  data: T;
}

export interface ContactType {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}
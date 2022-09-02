import { AxiosError } from "axios";
export interface ISampler {
  id: string;
  name: string;
  url: string;
  created_by: string;
  runtime: number;
  upload_date: string;
  created_at: string;
  updated_at: string;
}

export interface IScene {
  id: string;
  tricks: string;
  timestamp: number;
  endstamp: number;
  performed_by: string;
  upload_date: string;
  created_at: string;
  updated_at: string;
  index?: number;
  sampler: {
    id: string;
    name: string;
    url: string;
    created_by: string;
  };
}

export interface ICurrentScene {
  id: string;
  tricks: string;
  timestamp: number;
  endstamp: number;
  performed_by: string;
  index?: number;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthRes {
  user: IUser;
  token: string;
  error: AxiosError;
}

export interface IAuthDTO {
  email: string;
  password: string;
}

import { AxiosError } from "axios";

export interface ISampler {
  id: string;
  name: string;
  url: string;
  sampler_author: string;
  runtime: number;
  upload_date: string;
  created_at: string;
  updated_at: string;
}
export interface ISamplersResponse {
  data: ISampler[];
}

export interface ISamplerResponse {
  data: ISampler;
}

export interface IScene {
  id: string;
  tricks: string;
  timestamp: number;
  endstamp: number;
  performed_by: string;
  date_created: string;
  data_updated: string;
  index?: number;
  user_created?: string;
  user_updated?: string;
  sampler_id: string;

  sampler?: {
    id: string;
    name: string;
    url: string;
    created_by: string;
  };
}

export interface IScenesResponse {
  data: IScene[];
}

export interface ISceneResponse {
  data: IScene;
}
export interface ICurrentScene {
  id: string;
  tricks: string;
  timestamp: number;
  endstamp: number;
  performed_by: string;
  index?: number;
  url?: string;
  samplerId?: string;
  samplerName?: string;
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

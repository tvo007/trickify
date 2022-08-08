import axios from "axios";
import { ISampler, IScene } from "./interfaces";

export const restAPI = process.env.NEXT_PUBLIC_REST_URL;

export const siteUrl = process.env.NEXT_PUBLIC_CLIENT_URL


//rest api
export const getSamplers = async () => {
  const { data } = await axios.get<ISampler[]>(`${restAPI}/samplers`);
  return data;
};

export const getSamplerById = async (id) => {
  const { data } = await axios.get<ISampler>(`${restAPI}/samplers/${id}`);
  return data;
};

export const getScenesBySamplerId = async (id) => {
  const { data } = await axios.get<IScene[]>(`${restAPI}/scenes/sampler/${id}`);
  return data;
};

export const addScene = async (formData) => {
  const { data } = await axios.post<IScene>(`${restAPI}/scenes`, formData);
  return data;
  //returns single obj response and not the whole array
  //id is sampler id
};

//auth
export const login = async (formData) => {
  const { data } = await axios.post(`${restAPI}/auth/signin`, formData);
  return data;
};

//scene search
export const searchScenes = async (formData) => {
  const { data } = await axios.post<IScene[]>(`${restAPI}/scenes/search`, formData);
  return data;
};

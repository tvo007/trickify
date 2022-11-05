import axios from "axios";
import {
  IAuthDTO,
  IAuthRes,
  ISampler,
  IScene,
  ISamplersResponse,
  ISamplerResponse,
  IScenesResponse,
} from "./interfaces";

export const restAPI = process.env.NEXT_PUBLIC_API_URL;

export const siteUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

//rest api
export const getSamplers = async () => {
  const {
    data: { data: data },
  } = await axios.get<ISamplersResponse>(`${restAPI}/items/samplers`);
  return data;
};

export const getSamplerById = async (id) => {
  const {
    data: { data: data },
  } = await axios.get<ISamplerResponse>(`${restAPI}/items/samplers/${id}`);
  return data;
};

export const getScenesBySamplerId = async (id: string) => {
  const {
    data: { data: data },
  } = await axios.get<IScenesResponse>(
    `${restAPI}/items/scenes?filter[sampler_id][_eq]=${id}&sort[]=+timestamp`
  ); //get scenes by samplers id and sorted by asc timestamp value

  return data;
};

export const addScene = async (formData) => {
  const { data } = await axios.post<IScene>(`${restAPI}/scenes`, formData);
  return data;
  //returns single obj response and not the whole array
  //id is sampler id
};

//auth
export const loginAsAdmin = async (formData: IAuthDTO) => {
  const { data } = await axios.post<IAuthRes>(
    `${restAPI}/auth/signin`,
    formData
  );
  return data;
};

//scene search
export const searchScenes = async (formData: string) => {
  const {
    data: { data: data },
  } = await axios.get<IScenesResponse>(
    `${restAPI}/items/scenes?alias[sampler]=sampler_id&fields=*,sampler.name,sampler.url&search=${formData}`
  );
  return data;
};

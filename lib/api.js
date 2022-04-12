import { request, gql } from "graphql-request";
import { ALL_SAMPLERS_QUERY } from "../lib/graphql-query-mutation";
import axios from 'axios'

export const graphQLAPI = process.env.NEXT_PUBLIC_API_URL

export const restAPI = process.env.NEXT_PUBLIC_REST_URL

//graphql request if needed
export const getSamplersGraph = async () => {
    const data = await request(graphQLAPI, gql`${ALL_SAMPLERS_QUERY}`)
    return data
}

//rest api
export const getSamplers = async () => {

    const {data} =  await axios.get (`${restAPI}/samplers`);
    return data
  };

  export const getSamplerById = async (id) => {

    const {data} =  await axios.get (`${restAPI}/samplers/${id}`);
    return data
  };

  export const addScene = async formData => {
    const {data} = await axios.post(`${restAPI}/scenes`, formData)
    return data
    //returns single obj response and not the whole array
    //id is sampler id
  }

  //auth
  export const login = async formData => {
    const {data} = await axios.post(`${restAPI}/auth/signin`, formData)
    return data
  }




//hook to fetch scenes according to sampler id
import { useQuery } from "react-query";
import { getScenesBySamplerId } from "../api";
import {  IScene } from "../interfaces";

const useScenes = (id) =>
  useQuery<IScene[], Error> 
  (["scenes"],
  async () => getScenesBySamplerId(id),
  {
    cacheTime: 0,
  });

export default useScenes;

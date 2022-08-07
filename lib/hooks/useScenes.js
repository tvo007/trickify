//hook to fetch scenes according to sampler id
import { useQuery } from "react-query";
import { getScenesBySamplerId } from "../api";

const useScenes = (id) =>
  useQuery(["scenes"], async () => getScenesBySamplerId(id), {
    cacheTime: 0,
  });

export default useScenes;

//hook to fetch scenes according to sampler id
import {useCallback, useMemo} from "react";
import { useQuery } from "react-query";
import { getScenesBySamplerId } from "../api";
import {  IScene } from "../interfaces";

  // console.log(
  //   scenes ? Math.min(...scenes.map((scene) => scene.timestamp)) : "bruh"
  // );
export const earliestTimestamp  = (data: IScene[]) => {
  if (data) return Math.min(...data.map((scene) => scene.timestamp))
  else return 0
 
}

const useScenes = (id: string, isAdmin:boolean = false) =>
  useQuery<IScene[], Error> 
  (["scenes"],
  async () => getScenesBySamplerId(id), 
  {
    cacheTime: isAdmin ? 0 : 60000
  });

export default useScenes;

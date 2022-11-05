//hook to fetch scenes according to sampler id
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { getScenesBySamplerId } from "../api";
import { IScene, IScenesResponse } from "../interfaces";

// console.log(
//   scenes ? Math.min(...scenes.map((scene) => scene.timestamp)) : "bruh"
// );
export const calcSceneByTimePlayed = function (number, array) {
  const scenes = array.filter((scene) => {
    if (number >= scene.timestamp && number <= scene.endstamp) {
      return scene;
    }
  });

  if (scenes.length > 0) {
    // console.log(scenes);
    return scenes[0];
  } else {
    return null;
  }
};

export const earliestTimestamp = (data: IScene[]) => {
  if (data) return Math.min(...data.map((scene) => scene.timestamp));
  else return 0;
};

export const getSceneByIndex = (index: number, arr: IScene[]) => {
  if (!arr) return null;
  else return arr.find((scene) => scene.index === index);
}; //if index is less than 1 return scene @ index 1
//if index doesnt exist, then return null??

const useScenes = (id: string) =>
  useQuery<IScene[], Error>(["scenes"], async () => getScenesBySamplerId(id), {
    refetchOnMount: true,
    select: (data) =>
      data.map((scene, index) => {
        return { ...scene, index: index + 1 };
      }),
  });

export default useScenes;

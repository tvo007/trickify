import { ConstructionOutlined } from "@mui/icons-material";

export const breakpoints = {
  extraSmall: "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  extraLarge: "xl",
};

export const youtube_parser = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const secondsToTime = (e) => {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return h + ":" + m + ":" + s;
  //return `${h}:${m}:${s}`;
};

export const generateUrl = (url, timestamp) => {
  return url + `?t=${timestamp}`;
};

export const findScene = function (number, array) {
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

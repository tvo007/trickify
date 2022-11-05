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

  const val = url.toString();
  var match = val.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}; //todo refactor for ts, .match requires value to be toString'd

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

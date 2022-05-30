export const breakpoints = {
  extraSmall: 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl',
};


export const youtube_parser = url => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match (regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

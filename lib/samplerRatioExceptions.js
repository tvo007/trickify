//list of samplers with weird ratios
//causes react-player to break certain sampler aspect ratios
//this brute forces a correct aspect ratio
//temp solution
export const samplerList = [
  "Artsy",
  "Cool Moves, Different Locations",
  "Ghost",
];

export const exceptionStyles = {
  position: "relative",
  pt: "56.25%",
  mb: "1rem",
  width: { xs: "90vw", md: "93vw" },
  maxWidth: { xs: "90vw", md: "93vw", lg: "72rem" },
};

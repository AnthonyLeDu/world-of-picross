
export const rgbaStringFromArray = (rgba) => {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
};

export const areEqualRgbas = (rgba1, rgba2) => {
  return JSON.stringify(rgba1) === JSON.stringify(rgba2);
};

export const formatNumber = (x: number) => {
  if (x >= 1000000000 || x <= -1000000000) {
    return (x / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (x >= 1000000 || x <= -1000000) {
    return (x / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (x >= 1000 || x <= -1000) {
    return (x / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return x;
};

export const getOrdinalNum = (number: number) => {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ["th", "st", "nd", "rd", ""][selector];
};

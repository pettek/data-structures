const HEIGHT = 5;
const COMPARATOR = (a, b) => a - b;
const GENERATOR = (max) => {
  let rand = 0;

  for (let i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return Math.round(Math.abs(((rand / 6) - 0.5) * 2) * max) + 1;
};

export const DEFAULT_ARGS = {
  comparator: COMPARATOR,
  generator: GENERATOR,
  height: HEIGHT,
};
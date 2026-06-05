export const toNumber = (value) => {
  const num = Number(value ?? 0);
  return Number.isNaN(num) ? 0 : num;
};

export const format2 = (value) => {
  const num = toNumber(value);
  return num.toFixed(2);
};

export const percentOf = (value, total) => {
  const num = toNumber(value);
  const den = toNumber(total);
  if (den <= 0) return 0;
  return (num / den) * 100;
};

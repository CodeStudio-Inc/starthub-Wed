export const generateId = () => {
  const characters = "abcdefgh0123456789";
  const length = 24;
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};

export const getCurrentQuarter = () => {
  const month = new Date().getMonth();
  let quarter;

  if (month >= 0 && month <= 2) {
    quarter = 1;
  } else if (month >= 3 && month <= 5) {
    quarter = 2;
  } else if (month >= 6 && month <= 8) {
    quarter = 3;
  } else {
    quarter = 4;
  }

  return quarter;
};

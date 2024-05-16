export const randomInt = (value) => {
  return Math.floor(Math.random() * value);
};

export const uppercaseFirstText = (text) => {
  let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalizedText;
};

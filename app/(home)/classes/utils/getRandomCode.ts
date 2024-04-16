export const createRandomCode = (type: string) => {
  let characters;

  if (type === "class") {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  } else {
    characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  }

  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

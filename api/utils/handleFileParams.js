import { v4 as uuidv4 } from "uuid";
export const handleFileName = (name) => {
  const fileExt = name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `images/${fileName}`;

  return filePath;
};

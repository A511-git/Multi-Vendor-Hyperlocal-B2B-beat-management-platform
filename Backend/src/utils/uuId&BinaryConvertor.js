import { parse as uuidParse, stringify as uuidStringify } from "uuid";

export const toBinaryUUID = (uuidStr) => {
  return Buffer.from(uuidParse(uuidStr));
};

export const fromBinaryUUID = (binary) => {
  return uuidStringify(Buffer.from(binary));
};

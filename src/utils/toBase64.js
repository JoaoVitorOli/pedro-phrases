import fs from "fs";

export function toBase64(filePath) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString("base64");
}

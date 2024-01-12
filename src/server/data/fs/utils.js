// utils.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getDirname = importMeta => {
  const __filename = fileURLToPath(importMeta.url);
  return dirname(__filename);
};

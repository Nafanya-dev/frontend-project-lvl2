import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';

const getData = (fileAddress) => {
  const currentDirectory = cwd();
  const absolutePath = path.resolve(currentDirectory, fileAddress);
  const data = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
};

export default getData;

import getData from './src/getData.js';
import parsers from './src/parsers.js';
import getTreeDiff from './src/getTreeDiff.js';
import index from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const [, extension] = filePath1.split('.');
  const fileData1 = getData(filePath1);
  const fileData2 = getData(filePath2);
  const fileOne = parsers(fileData1, extension);
  const fileTwo = parsers(fileData2, extension);
  const treeDiff = getTreeDiff(fileOne, fileTwo);

  return index(treeDiff, formatName);
};

export default genDiff;

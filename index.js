import replaceAllInserter from 'string.prototype.replaceall';
import getData from './src/getData.js';
import parsers from './src/parsers.js';
import stylish from './src/stylish.js';
import genDiff from './src/genDiff.js';

replaceAllInserter.shim();

export default (filePath1, filePath2, format = stylish) => {
  // получаем расширение файла
  const [, extension] = filePath1.split('.');
  // читаем и парсим файлы
  const fileData1 = getData(filePath1);
  const fileData2 = getData(filePath2);
  const fileOne = parsers(fileData1, extension);
  const fileTwo = parsers(fileData2, extension);
  // строим дерево с описанием разницы ключей
  const treeOfDiff = genDiff(fileOne, fileTwo);
  // ставим маркеры, делаем отступы
  const style = format(treeOfDiff);

  console.log(style);
  return style;
};

import _ from 'lodash';
import replaceAllInserter from 'string.prototype.replaceall';
import getData from './getData.js';
import parsers from './parsers.js';

replaceAllInserter.shim();

export default (filePath1, filePath2) => {
  // получаем расширение файла
  const [, extension] = filePath1.split('.');
  // читаем и парсим файлы
  const fileData1 = getData(filePath1);
  const fileData2 = getData(filePath2);
  const file1 = parsers(fileData1, extension);
  const file2 = parsers(fileData2, extension);
  // получаем и сортируем ключи
  const keys = _.union([...Object.keys(file1), ...Object.keys(file2)]);
  const sortKeys = _.sortBy(keys);

  const result = sortKeys
    .reduce((acc, key) => {
      if (_.has(file1, key)) {
        if (_.has(file2, key)) {
          return file1[key] === file2[key]
            ? { ...acc, [`  ${key}`]: file1[key] }
            : { ...acc, [`- ${key}`]: file1[key], [`+ ${key}`]: file2[key] };
        } return { ...acc, [`- ${key}`]: file1[key] };
      } return { ...acc, [`+ ${key}`]: file2[key] };
    }, {});

  console.log(JSON.stringify(result, null, 2).replaceAll('"', '').replaceAll(',', ''));
  return JSON.stringify(result, null, 2).replaceAll('"', '').replaceAll(',', '');
};

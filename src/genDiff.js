import _ from 'lodash';
import getData from './getData.js';

export default (filePath1, filePath2) => {
  const file1 = getData(filePath1);
  const file2 = getData(filePath2);
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

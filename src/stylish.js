import _ from 'lodash';
import backIndents from './backIndents.js';

const changeDepthFiles = (obj, depth) => {
  const keys = Object.keys(obj);
  return keys
    .reduce((acc, key) => {
      const name = `  ${key}`;
      const value = typeof obj[key] === 'object'
        ? changeDepthFiles(obj[key], depth + 2)
        : _.cloneDeep(obj[key]);
      const correctName = ' '.repeat(depth) + name;
      return { ...acc, [correctName]: value };
    }, {});
};

const stylish = (treeDeep) => {
  const getStyle = (tree, depth = 0) => tree
    .reduce((acc, file) => {
      const key = file.name;

      let value;
      if (file.type === 'general' && Array.isArray(file.children)) {
        value = getStyle(file.children, depth + 2);
      } else {
        value = typeof file.children === 'object'
          ? changeDepthFiles({ ...file.children }, depth + 2)
          : _.cloneDeep(file.children);
      }

      let sign;
      if (file.type === 'deleted') {
        sign = '- ';
      } else if (file.type === 'added') {
        sign = '+ ';
      } else {
        sign = '  ';
      }
      sign = ' '.repeat(depth) + sign;
      return { ...acc, [`${sign}${key}`]: value };
    }, {});

  const result = getStyle(treeDeep);
  return backIndents(JSON.stringify(result, null, 2)
    .replaceAll('"', '')
    .replaceAll(',', ''));
};

export default stylish;

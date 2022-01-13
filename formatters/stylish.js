import _ from 'lodash';

const getDepthFiles = (obj, depth) => {
  const keys = Object.keys(obj);
  const indent = ' '.repeat(depth);
  return keys
    .reduce((acc, key) => {
      const name = `  ${key}`;
      const value = typeof obj[key] === 'object'
        ? `{${getDepthFiles(obj[key], depth + 4)}\n${indent}  }`
        : _.cloneDeep(obj[key]);
      return `${acc}\n${indent}${name}: ${value}`;
    }, '');
};

const stylish = (treeDeep) => {
  const getStyle = (tree, depth = 2) => tree
    .reduce((acc, file) => {
      const key = !file.name ? Object.keys(file)[0] : file.name;
      const indent = ' '.repeat(depth);
      const value = [];
      if (Array.isArray(file.children)) {
        value[0] = `{${getStyle(file.children, depth + 4)}\n${indent}  }`;
      } else {
        value[0] = typeof file.children === 'object'
          ? `{${getDepthFiles({ ...file.children }, depth + 4)}\n${indent}  }`
          : _.cloneDeep(file.children);
      }
      const sign = [];
      if (file.type === 'deleted') {
        sign[0] = '- ';
      } else if (file.type === 'added') {
        sign[0] = '+ ';
      } else {
        sign[0] = '  ';
      }
      const correctName = `${sign[0]}${key}`;
      return `${acc}\n${indent}${correctName}: ${value[0]}`;
    }, '');
  return `{${getStyle(treeDeep)}\n}`;
};

export default stylish;

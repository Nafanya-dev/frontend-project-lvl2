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
      let value;
      if (Array.isArray(file.children)) {
        value = `{${getStyle(file.children, depth + 4)}\n${indent}  }`;
      } else {
        value = typeof file.children === 'object'
          ? `{${getDepthFiles({ ...file.children }, depth + 4)}\n${indent}  }`
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
      const correctName = `${sign}${key}`;
      return `${acc}\n${indent}${correctName}: ${value}`;
    }, '');
  return `{${getStyle(treeDeep)}\n}`;
};

export default stylish;

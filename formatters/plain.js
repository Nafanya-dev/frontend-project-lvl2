import _ from 'lodash';

const plain = (treeDeep) => {
  const previous = [null];
  const getStyle = (tree, path = '') => tree
    .reduce((acc, file) => {
      const newLine = acc === '' ? '' : '\n';
      const pathToProperty = path === '' ? file.name : `${path}.${file.name}`;
      const value = [typeof file.children === 'object' ? '[complex value]' : _.cloneDeep(file.children)];
      value[0] = typeof file.children === 'string' && file.children !== 'null'
        ? `'${value[0]}'`
        : value[0];
      const text = [];

      if (file.type === 'general' && Array.isArray(file.children)) {
        return `${acc}${getStyle(file.children, pathToProperty)}`;
      } if (file.type === 'deleted') {
        if (file.beenUpdated) {
          previous[0] = _.cloneDeep(file);
          return acc;
        }
        text[0] = 'was removed';
      } if (file.type === 'added') {
        if (file.beenUpdated) {
          const from = [typeof previous[0].children === 'object' ? '[complex value]' : _.cloneDeep(previous[0].children)];
          from[0] = typeof previous[0].children === 'string' && previous[0].children !== 'null'
            ? `'${from[0]}'`
            : from[0];
          text[0] = `was updated. From ${from[0]} to ${value[0]}`;
          previous[0] = null;
          return `${acc}\nProperty '${pathToProperty}' ${text[0]}`;
        }
        text[0] = `was added with value: ${value[0]}`;
      }
      return text[0] ? `${acc}${newLine}Property '${pathToProperty}' ${text[0]}` : acc;
    }, '');
  return getStyle(treeDeep);
};

export default plain;

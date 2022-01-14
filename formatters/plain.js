import _ from 'lodash';

const plain = (treeDeep) => {
  const previous = [null];
  const getStyle = (tree, path = '') => tree
    .reduce((acc, file) => {
      const newLine = acc === '' ? '' : '\n';
      const pathToProperty = path === '' ? file.name : `${path}.${file.name}`;
      const getValue = [typeof file.children === 'object' ? '[complex value]' : _.cloneDeep(file.children)];
      const value = typeof file.children === 'string' && file.children !== 'null'
        ? `'${getValue[0]}'`
        : getValue[0];
      const text = [];

      if (file.type === 'general' && Array.isArray(file.children)) {
        return `${acc}${getStyle(file.children, pathToProperty)}`;
      } if (file.type === 'deleted') {
        if (file.beenUpdated) {
          /* eslint-disable-next-line */
          previous[0] = _.cloneDeep(file);
          return acc;
        }
        /* eslint-disable-next-line */
        text[0] = 'was removed';
      } if (file.type === 'added') {
        if (file.beenUpdated) {
          const previousValue = [typeof previous[0].children === 'object' ? '[complex value]' : _.cloneDeep(previous[0].children)];
          const from = typeof previous[0].children === 'string' && previous[0].children !== 'null'
            ? `'${previousValue[0]}'`
            : previousValue[0];
            /* eslint-disable-next-line */
          text[0] = `was updated. From ${from} to ${value}`;
          /* eslint-disable-next-line */
          previous[0] = null;
          return `${acc}\nProperty '${pathToProperty}' ${text[0]}`;
        }
        /* eslint-disable-next-line */
        text[0] = `was added with value: ${value}`;
      }
      return text[0] ? `${acc}${newLine}Property '${pathToProperty}' ${text[0]}` : acc;
    }, '');
  return getStyle(treeDeep);
};

export default plain;

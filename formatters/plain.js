import _ from 'lodash';

const plain = (treeDeep) => {
  /* eslint-disable-next-line */
  let previous = null;
  const getStyle = (tree, path = '') => tree
    .reduce((acc, file) => {
      const newLine = acc === '' ? '' : '\n';
      const pathToProperty = path === '' ? file.name : `${path}.${file.name}`;
      /* eslint-disable-next-line */
      let value = typeof file.children === 'object' ? '[complex value]' : _.cloneDeep(file.children);
      value = typeof file.children === 'string' && file.children !== 'null'
        ? `'${value}'`
        : value;
      /* eslint-disable-next-line */
      let text;

      if (file.type === 'general' && Array.isArray(file.children)) {
        return `${acc}${getStyle(file.children, pathToProperty)}`;
      } if (file.type === 'deleted') {
        if (file.beenUpdated) {
          previous = _.cloneDeep(file);
          return acc;
        }
        text = 'was removed';
      } if (file.type === 'added') {
        if (file.beenUpdated) {
          /* eslint-disable-next-line */
          let from = typeof previous.children === 'object' ? '[complex value]' : _.cloneDeep(previous.children);
          from = typeof previous.children === 'string' && previous.children !== 'null'
            ? `'${from}'`
            : from;

          text = `was updated. From ${from} to ${value}`;
          previous = null;
          return `${acc}\nProperty '${pathToProperty}' ${text}`;
        }
        text = `was added with value: ${value}`;
      }
      return text ? `${acc}${newLine}Property '${pathToProperty}' ${text}` : acc;
    }, '');
  return getStyle(treeDeep);
};

export default plain;

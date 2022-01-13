import _ from 'lodash';

const json = (treeDeep) => {
  const previous = [null];
  const closingBracket = [false];
  const getStyle = (tree) => tree
    .reduce((acc, file) => {
      const value = [];
      if (file.children === 'null' || typeof file.children === 'number') {
        value[0] = file.children === 'null' ? null : _.cloneDeep(file.children);
      } else {
        value[0] = JSON.stringify(_.cloneDeep(file.children));
      }

      if (file.type === 'general' && Array.isArray(file.children)) {
        return `${acc}{"name":"${file.name}","type":"notChanged","value":[${getStyle(file.children)}]}`;
      } if (file.type === 'deleted') {
        if (file.beenUpdated) {
          previous[0] = _.cloneDeep(file);
          return acc;
        }
        return `${acc}{"name":"${file.name}","type":"removed","value":${value[0]}}`;
      } if (file.type === 'added') {
        if (previous[0] !== null) {
          const oldValue = [];
          if (previous[0].children === 'null' || typeof previous[0].children === 'number') {
            oldValue[0] = previous[0].children === 'null' ? null : _.cloneDeep(previous[0].children);
          } else {
            oldValue[0] = JSON.stringify(_.cloneDeep(previous[0].children));
          }
          const newValue = value[0];
          previous[0] = null;
          return `${acc}{"name":"${file.name}","type":"updated","oldValue":${oldValue},"newValue":${newValue}}`;
        }
        return `${acc}{"name":"${file.name}","type":"added","value":${value[0]}}`;
      }
      return `${acc}{"name":"${file.name}","type":"notChanged","value":${value[0]}}`;
    }, '');
  return JSON.parse(`[${getStyle(treeDeep)}]`.split('')
    .map((char) => {
      if (char === '}') {
        closingBracket[0] = true;
      } if (char === '{' && closingBracket[0]) {
        closingBracket[0] = false;
        return `,${char}`;
      }
      return char;
    })
    .join(''));
};

export default json;

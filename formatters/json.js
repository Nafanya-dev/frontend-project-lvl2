import _ from 'lodash';

const json = (treeDeep) => {
  /* eslint-disable-next-line */
  let previous = null;
  /* eslint-disable-next-line */
  let closingBracket = false;
  const getStyle = (tree) => tree
    .reduce((acc, file) => {
      /* eslint-disable-next-line */
      let value;
      if (file.children === 'null' || typeof file.children === 'number') {
        value = file.children === 'null' ? null : _.cloneDeep(file.children);
      } else {
        value = JSON.stringify(_.cloneDeep(file.children));
      }

      if (file.type === 'general' && Array.isArray(file.children)) {
        return `${acc}{"name":"${file.name}","type":"notChanged","value":[${getStyle(file.children)}]}`;
      } if (file.type === 'deleted') {
        if (file.beenUpdated) {
          previous = _.cloneDeep(file);
          return acc;
        }
        return `${acc}{"name":"${file.name}","type":"removed","value":${value}}`;
      } if (file.type === 'added') {
        if (previous !== null) {
          /* eslint-disable-next-line */
          let oldValue;
          if (previous.children === 'null' || typeof previous.children === 'number') {
            oldValue = previous.children === 'null' ? null : _.cloneDeep(previous.children);
          } else {
            oldValue = JSON.stringify(_.cloneDeep(previous.children));
          }
          const newValue = value;
          previous = null;
          return `${acc}{"name":"${file.name}","type":"updated","oldValue":${oldValue},"newValue":${newValue}}`;
        }
        return `${acc}{"name":"${file.name}","type":"added","value":${value}}`;
      }
      return `${acc}{"name":"${file.name}","type":"notChanged","value":${value}}`;
    }, '');
  return `[${getStyle(treeDeep)}]`.split('')
    .map((char) => {
      if (char === '}') {
        closingBracket = true;
      } if (char === '{' && closingBracket) {
        closingBracket = false;
        return `,${char}`;
      }
      return char;
    })
    .join('');
};

export default json;

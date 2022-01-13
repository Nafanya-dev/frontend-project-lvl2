import _ from 'lodash';

const json = (treeDeep) => {
  const getObj = (tree) => tree
    .reduce((acc, file) => {
      const key = !file.name ? Object.keys(file)[0] : file.name;
      const value = [];
      if (Array.isArray(file.children)) {
        value[0] = getObj(file.children);
      } else {
        value[0] = file.children === 'null' ? null : _.cloneDeep(file.children);
      }
      return [...acc, { name: key, type: file.type, value: value[0] }];
    }, []);
  return getObj(treeDeep);
};

export default json;

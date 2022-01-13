import _ from 'lodash';

const json = (treeDeep) => {
  const previous = [null];
  const getObj = (tree) => tree
    .reduce((acc, file) => {
      const key = !file.name ? Object.keys(file)[0] : file.name;
      const value = [];
      if (Array.isArray(file.children)) {
        value[0] = getObj(file.children);
      } else {
        value[0] = file.children === 'null' ? null : _.cloneDeep(file.children);
      }
      if (file.type === 'deleted' && file.beenUpdated) {
        previous[0] = _.cloneDeep(file);
        return acc;
      } if (file.type === 'added' && file.beenUpdated) {
        const oldValue = _.cloneDeep(previous[0].children);
        previous[0] = null;
        return { ...acc, [key]: ['updated', oldValue, value[0]] };
      }
      return { ...acc, [key]: [file.type, value[0]] };
    }, {});
  return getObj(treeDeep);
};

export default json;

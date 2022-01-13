import _ from 'lodash';

const getTreeDiff = (file1, file2) => {
  const keys = _.union([...Object.keys(file1), ...Object.keys(file2)]);
  const sortKeys = _.sortBy(keys);

  return sortKeys.reduce((acc, key) => {
    const name = key;
    /* eslint-disable-next-line */
    let type;
    if (_.has(file1, key)) {
      if (_.has(file2, key)) {
        type = 'general';
      } else {
        type = 'deleted';
      }
    } else {
      type = 'added';
    }
    /* eslint-disable-next-line */
    let valueFile1;
    /* eslint-disable-next-line */
    let valueFile2;
    if (type === 'general') {
      if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
        valueFile1 = getTreeDiff(file1[key], file2[key]);
      } else if (file1[key] === file2[key]) {
        valueFile1 = _.cloneDeep(file1[key]);
      } else {
        valueFile1 = file1[key] === null ? 'null' : _.cloneDeep(file1[key]);
        valueFile2 = file2[key] === null ? 'null' : _.cloneDeep(file2[key]);
        type = 'differ';
      }
    } else {
      valueFile1 = type === 'deleted' ? _.cloneDeep(file1[key]) : _.cloneDeep(file2[key]);
    }
    return type === 'differ'
      ? [...acc, {
        name,
        type: 'deleted',
        beenUpdated: true,
        children: valueFile1,
      }, {
        name,
        type: 'added',
        beenUpdated: true,
        children: valueFile2,
      }]
      : [...acc, {
        name,
        type,
        beenUpdated: false,
        children: valueFile1,
      }];
  }, []);
};

export default getTreeDiff;

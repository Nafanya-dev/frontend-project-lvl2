import _ from 'lodash';

const getTreeDiff = (file1, file2) => {
  const keys = _.union([...Object.keys(file1), ...Object.keys(file2)]);
  const sortKeys = _.sortBy(keys);

  return sortKeys.reduce((acc, key) => {
    const name = key;
    const type = [];
    if (_.has(file1, key)) {
      if (_.has(file2, key)) {
        /* eslint-disable-next-line */
        type.push('general');
      } else {
        /* eslint-disable-next-line */
        type.push('deleted');
      }
    } else {
      /* eslint-disable-next-line */
      type.push('added');
    }
    const valueFile1 = [];
    const valueFile2 = [];
    if (type[0] === 'general') {
      if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
        /* eslint-disable-next-line */
        valueFile1.push(getTreeDiff(file1[key], file2[key]));
      } else if (file1[key] === file2[key]) {
        /* eslint-disable-next-line */
        valueFile1.push(_.cloneDeep(file1[key]));
      } else {
        /* eslint-disable-next-line */
        valueFile1.push(file1[key] === null ? 'null' : _.cloneDeep(file1[key]));
        /* eslint-disable-next-line */
        valueFile2.push(file2[key] === null ? 'null' : _.cloneDeep(file2[key]));
        /* eslint-disable-next-line */
        type.push('differ');
      }
    } else {
      /* eslint-disable-next-line */
      valueFile1.push(type[0] === 'deleted' ? _.cloneDeep(file1[key]) : _.cloneDeep(file2[key]));
    }
    return type[type.length - 1] === 'differ'
      ? [...acc, {
        name,
        type: 'deleted',
        beenUpdated: true,
        children: valueFile1[0],
      }, {
        name,
        type: 'added',
        beenUpdated: true,
        children: valueFile2[0],
      }]
      : [...acc, {
        name,
        type: type[0],
        beenUpdated: false,
        children: valueFile1[0],
      }];
  }, []);
};

export default getTreeDiff;

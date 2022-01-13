import yaml from 'js-yaml';

export default (data, extension) => {
  /* eslint-disable-next-line */
  let result;
  if (extension === 'yaml' || extension === 'yml') {
    result = yaml.load(data);
  } else if (extension === 'json') {
    result = JSON.parse(data);
  }
  return result;
};

import yaml from 'js-yaml';

export default (data, extension) => {
  const result = [];
  if (extension === 'yaml' || extension === 'yml') {
    result[0] = yaml.load(data);
  } else if (extension === 'json') {
    result[0] = JSON.parse(data);
  }
  return result[0];
};

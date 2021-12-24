import yaml from 'js-yaml';

export default (data, extension) => {
  let result;
  if (extension === 'yaml' || extension === 'yml') {
    result = yaml.load(data);
  } if (extension === 'json') {
    result = JSON.parse(data);
  }
  return result;
};

import yaml from 'js-yaml';

export default (data, extension) => {
  if (extension === 'yaml' || extension === 'yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

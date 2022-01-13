import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (tree, formatName) => {
  if (formatName === 'plain') {
    return plain(tree);
  }
  return formatName === 'json' ? json(tree) : stylish(tree);
};

import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, formatName) => (formatName === 'plain' ? plain(tree) : stylish(tree));

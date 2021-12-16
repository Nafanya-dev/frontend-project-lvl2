import path from 'path';
import { cwd } from 'process';

export default (fileName) => path.join(cwd(), '_fixtures_', fileName);

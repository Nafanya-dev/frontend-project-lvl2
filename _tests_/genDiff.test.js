import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';
import getFixturePath from '../src/getFixturePath.js';

let pathFile1;
let pathFile2;
let correct1;

beforeAll(() => {
  pathFile1 = getFixturePath('file1.json');
  pathFile2 = getFixturePath('file2.json');
  correct1 = readFileSync(getFixturePath('correct1.json'), 'utf-8');
});

test('genDiff', () => {
  expect(genDiff(pathFile1, pathFile2)).toEqual(correct1);
});

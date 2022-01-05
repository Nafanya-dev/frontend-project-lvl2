import { readFileSync } from 'fs';
import index from '../index.js';
import getFixturePath from '../src/getFixturePath.js';

let jsPathFile1;
let jsPathFile2;

let ymlPathFile1;
let ymlPathFile2;

let correct1;

beforeAll(() => {
  jsPathFile1 = getFixturePath('file1.json');
  jsPathFile2 = getFixturePath('file2.json');
  ymlPathFile1 = getFixturePath('file1.yaml');
  ymlPathFile2 = getFixturePath('file2.yaml');
  correct1 = readFileSync(getFixturePath('correct1.json'), 'utf-8');
});

test('genDiff_Json', () => {
  expect(index(jsPathFile1, jsPathFile2)).toEqual(correct1);
});

test('genDiff_Yaml', () => {
  expect(index(ymlPathFile1, ymlPathFile2)).toEqual(correct1);
});

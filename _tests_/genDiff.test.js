import { readFileSync } from 'fs';
import genDiff from '../genDiff.js';
import getFixturePath from '../src/getFixturePath.js';

let jsPathFile1;
let jsPathFile2;

let ymlPathFile1;
let ymlPathFile2;

let correctStylish;
let correctPlain;
let correctJson;

beforeAll(() => {
  jsPathFile1 = getFixturePath('file1.json');
  jsPathFile2 = getFixturePath('file2.json');
  ymlPathFile1 = getFixturePath('file1.yaml');
  ymlPathFile2 = getFixturePath('file2.yaml');
  correctStylish = readFileSync(getFixturePath('correctStylish.json'), 'utf-8');
  correctPlain = readFileSync(getFixturePath('correctPlain.json'), 'utf-8');
  correctJson = readFileSync(getFixturePath('correctJson.json'), 'utf-8');
});

describe('stylish', () => {
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2)).toEqual(correctStylish);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2)).toEqual(correctStylish);
  });
});

describe('plain', () => {
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2, 'plain')).toEqual(correctPlain);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2, 'plain')).toEqual(correctPlain);
  });
});

describe('json', () => {
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2, 'json')).toEqual(correctJson);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2, 'json')).toEqual(correctJson);
  });
});

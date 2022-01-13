import { readFileSync } from 'fs';
import genDiff from '../genDiff.js';
import getFixturePath from '../src/getFixturePath.js';

describe('stylish', () => {
  const jsPathFile1 = getFixturePath('file1.json');
  const jsPathFile2 = getFixturePath('file2.json');
  const ymlPathFile1 = getFixturePath('file1.yaml');
  const ymlPathFile2 = getFixturePath('file2.yaml');
  const correctStylish = readFileSync(getFixturePath('correctStylish.json'), 'utf-8');
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2)).toEqual(correctStylish);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2)).toEqual(correctStylish);
  });
});

describe('plain', () => {
  const jsPathFile1 = getFixturePath('file1.json');
  const jsPathFile2 = getFixturePath('file2.json');
  const ymlPathFile1 = getFixturePath('file1.yaml');
  const ymlPathFile2 = getFixturePath('file2.yaml');
  const correctPlain = readFileSync(getFixturePath('correctPlain.json'), 'utf-8');
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2, 'plain')).toEqual(correctPlain);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2, 'plain')).toEqual(correctPlain);
  });
});

describe('json', () => {
  const jsPathFile1 = getFixturePath('file1.json');
  const jsPathFile2 = getFixturePath('file2.json');
  const ymlPathFile1 = getFixturePath('file1.yaml');
  const ymlPathFile2 = getFixturePath('file2.yaml');
  const correctJson = readFileSync(getFixturePath('correctJson.json'), 'utf-8');
  test('genDiff_Json', () => {
    expect(genDiff(jsPathFile1, jsPathFile2, 'json')).toEqual(correctJson);
  });

  test('genDiff_Yaml', () => {
    expect(genDiff(ymlPathFile1, ymlPathFile2, 'json')).toEqual(correctJson);
  });
});

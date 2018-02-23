import { readFileSync } from 'fs';
import genDiff from '../src';

const beforeFileJson = '__tests__/__fixtures__/before.json';
const afterFileJson = '__tests__/__fixtures__/after.json';
const beforeFileYml = '__tests__/__fixtures__/before.yml';
const afterFileYml = '__tests__/__fixtures__/after.yml';
const beforeFileIni = '__tests__/__fixtures__/before.ini';
const afterFileIni = '__tests__/__fixtures__/after.ini';
const resFileName = '__tests__/__fixtures__/result';

describe('Generate difference', () => {
  it('reading json', () => {
    expect(genDiff(beforeFileJson, afterFileJson)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading yamls', () => {
    expect(genDiff(beforeFileYml, afterFileYml)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading inis', () => {
    expect(genDiff(beforeFileIni, afterFileIni)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading different', () => {
    expect(genDiff(beforeFileIni, afterFileYml)).toEqual(readFileSync(resFileName, 'utf8'));
  });
});

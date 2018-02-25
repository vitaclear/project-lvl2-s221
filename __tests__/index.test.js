import { readFileSync } from 'fs';
import genDiff from '../src';

const beforeFileJson = '__tests__/__fixtures__/before.json';
const afterFileJson = '__tests__/__fixtures__/after.json';
const beforeFileYml = '__tests__/__fixtures__/before.yml';
const afterFileYml = '__tests__/__fixtures__/after.yml';
const beforeFileIni = '__tests__/__fixtures__/before.ini';
const afterFileIni = '__tests__/__fixtures__/after.ini';
const resFileName = '__tests__/__fixtures__/result';

const beforeFileDeepJson = '__tests__/__fixtures__/beforeDeep.json';
const afterFileDeepJson = '__tests__/__fixtures__/afterDeep.json';
const beforeFileDeepYml = '__tests__/__fixtures__/beforeDeep.yml';
const afterFileDeepYml = '__tests__/__fixtures__/afterDeep.yml';
const beforeFileDeepIni = '__tests__/__fixtures__/beforeDeep.ini';
const afterFileDeepIni = '__tests__/__fixtures__/afterDeep.ini';
const resFileDeepName = '__tests__/__fixtures__/resultDeep';

describe('Generate difference', () => {
  it('reading json', () => {
    expect(genDiff(beforeFileJson, afterFileJson)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading yaml', () => {
    expect(genDiff(beforeFileYml, afterFileYml)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading ini', () => {
    expect(genDiff(beforeFileIni, afterFileIni)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading different', () => {
    expect(genDiff(beforeFileIni, afterFileYml)).toEqual(readFileSync(resFileName, 'utf8'));
  });
  it('reading deep json', () => {
    expect(genDiff(beforeFileDeepJson, afterFileDeepJson)).toEqual(readFileSync(resFileDeepName, 'utf8'));
  });
  it('reading deep yaml', () => {
    expect(genDiff(beforeFileDeepYml, afterFileDeepYml)).toEqual(readFileSync(resFileDeepName, 'utf8'));
  });
  it('reading deep ini', () => {
    expect(genDiff(beforeFileDeepIni, afterFileDeepIni)).toEqual(readFileSync(resFileDeepName, 'utf8'));
  });
});

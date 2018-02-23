import { readFileSync } from 'fs';
import genDiff from '../src';

const beforeJson = '__tests__/__fixtures__/before.json';
const afterJson = '__tests__/__fixtures__/after.json';
const beforeYml = '__tests__/__fixtures__/before.yml';
const afterYml = '__tests__/__fixtures__/after.yml';
const beforeIni = '__tests__/__fixtures__/before.ini';
const afterIni = '__tests__/__fixtures__/after.ini';
const resFile = readFileSync('__tests__/__fixtures__/result', 'utf8');

describe('Generate difference', () => {
  it('reading json', () => {
    expect(genDiff(beforeJson, afterJson)).toEqual(resFile);
  });
  it('reading yamls', () => {
    expect(genDiff(beforeYml, afterYml)).toEqual(resFile);
  });
  it('reading inis', () => {
    expect(genDiff(beforeIni, afterIni)).toEqual(resFile);
  });
  it('reading different', () => {
    expect(genDiff(beforeIni, afterYml)).toEqual(resFile);
  });
});

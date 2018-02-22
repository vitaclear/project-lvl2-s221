import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import genDiff, { findDiff } from '../src';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
};

const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const result = ['  host: hexlet.io', '+ timeout: 20', '- timeout: 50', '- proxy: 123.234.53.22', '+ verbose: true'];

const before = JSON.parse(readFileSync('__tests__/__fixtures__/before.json'));
const after = JSON.parse(readFileSync('__tests__/__fixtures__/after.json'));
const resFile = readFileSync('__tests__/__fixtures__/result', 'utf8');
const beforeYml = safeLoad(readFileSync('__tests__/__fixtures__/before.yml'));
const afterYml = safeLoad(readFileSync('__tests__/__fixtures__/after.yml'));
const beforeIni = parseIni(readFileSync('__tests__/__fixtures__/before.ini', 'utf-8'));
const afterIni = parseIni(readFileSync('__tests__/__fixtures__/after.ini', 'utf-8'));

describe('Generate difference', () => {
  it('logic', () => {
    expect(findDiff(obj1, obj2)).toEqual(result);
  });
  it('reading files', () => {
    expect(genDiff(before, after)).toEqual(resFile);
  });
  it('reading yamls', () => {
    expect(genDiff(beforeYml, afterYml)).toEqual(resFile);
  });
  it('reading inis', () => {
    expect(genDiff(beforeIni, afterIni)).toEqual(resFile);
  });
});

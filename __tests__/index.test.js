import { readFileSync } from 'fs';
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

describe('Generate difference', () => {
  it('logic', () => {
    expect(findDiff(obj1, obj2)).toEqual(result);
  });
  it('reading files', () => {
    expect(genDiff(before, after)).toEqual(resFile);
  });
});

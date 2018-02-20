import processFiles, { process, makeOutput } from '../src';

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

describe('Generate difference', () => {
  it('logic', () => {
    expect(process(obj1, obj2)).toEqual(result);
  });
  it('reading files', () => {
    expect(processFiles()).toEqual(makeOutput(result));
  });
});

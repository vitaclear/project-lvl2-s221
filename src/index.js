import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import _ from 'lodash';
import { extname } from 'path';
import render from './renderers';

const parsers = {
  '.yml': safeLoad,
  '.json': JSON.parse,
  '.ini': parseIni,
};

const makeNode = (type, key, children, beforeValue, afterValue) => ({
  type, key, children, beforeValue, afterValue,
});

const makeAST = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);
  const unionKeys = _.union(keysFromData1, keysFromData2);
  return unionKeys.map((el) => {
    if (data1[el] instanceof Object && data2[el] instanceof Object) {
      return makeNode('nested', el, makeAST(data1[el], data2[el]));
    }
    if (!data2[el]) {
      return makeNode('removed', el, [], data1[el]);
    }
    if (!data1[el]) {
      return makeNode('added', el, [], {}, data2[el]);
    }
    if (data1[el] === data2[el]) {
      return makeNode('unchanged', el, [], data1[el]);
    }
    return makeNode('updated', el, [], data1[el], data2[el]);
  });
};

const genDiff = (fstConfig, sndConfig, formatType) => {
  const readFstConfig = readFileSync(fstConfig, 'utf-8');
  const readSndConfig = readFileSync(sndConfig, 'utf-8');
  const parsedFstConfig = parsers[extname(fstConfig)](readFstConfig);
  const parsedSndConfig = parsers[extname(sndConfig)](readSndConfig);
  const ast = makeAST(parsedFstConfig, parsedSndConfig);
  return render(ast, formatType);
};

export default genDiff;

import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import _ from 'lodash';

const getType = (filePath) => {
  if (filePath.indexOf('.yml') !== -1) { return 'yaml'; }
  if (filePath.indexOf('.json') !== -1) { return 'json'; }
  if (filePath.indexOf('.ini') !== -1) { return 'ini'; }
  return 'unknown';
};

const makeData = (filePath) => {
  if (getType(filePath) === 'yaml') {
    return {
      data: readFileSync(filePath),
      parse: safeLoad(readFileSync(filePath)),
    };
  }
  if (getType(filePath) === 'json') {
    return {
      data: readFileSync(filePath),
      parse: JSON.parse(readFileSync(filePath)),
    };
  }
  if (getType(filePath) === 'ini') {
    return {
      data: readFileSync(filePath, 'utf-8'),
      parse: parseIni(readFileSync(filePath, 'utf-8')),
    };
  }
  return { parse: readFileSync(filePath) };
};

const findDiff = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);
  const unionKeys = _.union(keysFromData1, keysFromData2);
  const result = unionKeys.map((el) => {
    if (!_.has(data1, el)) {
      return `+ ${el}: ${data2[el]}`;
    }
    if (!_.has(data2, el)) {
      return `- ${el}: ${data1[el]}`;
    }
    if (data1[el] === data2[el]) {
      return `  ${el}: ${data1[el]}`;
    }
    return [`+ ${el}: ${data2[el]}`, `- ${el}: ${data1[el]}`];
  });
  return _.flatten(result);
};

const makeOutput = array => `{\n  ${array.join('\n  ')}\n}`;

const genDiff = (fstConfig, sndConfig) =>
  makeOutput(findDiff(makeData(fstConfig).parse, makeData(sndConfig).parse));

export default genDiff;

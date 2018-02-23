import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import _ from 'lodash';

const makeData = (filePath) => {
  if (filePath.indexOf('.yml') !== -1) { return { type: 'yaml', data: readFileSync(filePath) }; }
  if (filePath.indexOf('.json') !== -1) { return { type: 'json', data: readFileSync(filePath) }; }
  if (filePath.indexOf('.ini') !== -1) { return { type: 'ini', data: readFileSync(filePath, 'utf-8') }; }
  return { type: 'unknown', data: filePath };
};

const chooseParser = (obj) => {
  switch (obj.type) {
    case 'json':
      return JSON.parse(obj.data);
    case 'yaml':
      return safeLoad(obj.data);
    case 'ini':
      return parseIni(obj.data);
    default:
      return obj.data;
  }
};

export const parse = config => chooseParser(makeData(config));

const findDiff = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);
  const unionKeys = _.union(keysFromData1, keysFromData2);
  const result = unionKeys.map((el) => {
    if (!data1.hasOwnProperty.call(data1, el)) {
      return `+ ${el}: ${data2[el]}`;
    }
    if (!data2.hasOwnProperty.call(data2, el)) {
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

const genDiff = (fstConfig, sndConfig) => makeOutput(findDiff(parse(fstConfig), parse(sndConfig)));

export default genDiff;

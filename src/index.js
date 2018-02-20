import _ from 'lodash';
import { readFileSync } from 'fs';

export const process = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);
  const part1 = keysFromData1.map((el) => {
    if (keysFromData2.indexOf(el) > -1) {
      if (data1[el] === data2[el]) {
        return `  ${el}: ${data1[el]}`;
      }
      return [`+ ${el}: ${data2[el]}`, `- ${el}: ${data1[el]}`];
    }
    return `- ${el}: ${data1[el]}`;
  });
  const part2 = keysFromData2.filter(el => keysFromData1.indexOf(el) === -1)
    .map(el => `+ ${el}: ${data2[el]}`);
  return _.flatten(part1.concat(part2));
};

export const makeOutput = array => `{\n  ${array.join('\n  ')}\n}`;

const processFiles = () => {
  const before = JSON.parse(readFileSync('__tests__/__fixtures__/before.json'));
  const after = JSON.parse(readFileSync('__tests__/__fixtures__/after.json'));
  //  console.log(`++++ ${JSON.stringify(before)} +++ ${JSON.stringify(after)}`);
  return makeOutput(process(before, after));
};

export default processFiles;

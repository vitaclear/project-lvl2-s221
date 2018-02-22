import _ from 'lodash';

export const findDiff = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);

  const unionKeys = _.union(keysFromData1, keysFromData2);
  const result = unionKeys.map((el) => {
    if (keysFromData1.indexOf(el) > -1) {
      if (keysFromData2.indexOf(el) === -1) {
        return `- ${el}: ${data1[el]}`;
      }
      if (data1[el] === data2[el]) {
        return `  ${el}: ${data1[el]}`;
      }
      return [`+ ${el}: ${data2[el]}`, `- ${el}: ${data1[el]}`];
    }
    return `+ ${el}: ${data2[el]}`;
  });
  return _.flatten(result);
};

export const makeOutput = array => `{\n  ${array.join('\n  ')}\n}`;

const genDiff = (before, after) => makeOutput(findDiff(before, after));

export default genDiff;

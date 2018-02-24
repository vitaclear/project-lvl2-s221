import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import _ from 'lodash';
import { extname } from 'path';

const makeParser = {
  '.yml': file => safeLoad(file),
  '.json': file => JSON.parse(file),
  '.ini': file => parseIni(file),
};

const makeNode = ([children = [], key, beforeValue, afterValue]) => ({
  children, key, beforeValue, afterValue,
});

const makeUnchangedAst = (data) => {
  if (!(data instanceof Object)) {
    return data;
  }
  return Object.keys(data).map((el) => {
    if (data[el] instanceof Object) {
      return makeNode([makeUnchangedAst(data[el]), el]);
    }
    return makeNode([[], el, data[el], data[el]]);
  });
};

const makeAST = (data1, data2) => {
  const keysFromData1 = Object.keys(data1);
  const keysFromData2 = Object.keys(data2);
  const unionKeys = _.union(keysFromData1, keysFromData2);
  return unionKeys.map((el) => {
    if (data1[el] instanceof Object && data2[el] instanceof Object) {
      return makeNode([makeAST(data1[el], data2[el]), el]);
    }
    return makeNode([[], el, makeUnchangedAst(data1[el]), makeUnchangedAst(data2[el])]);
  });
};

const render = (ast, lvl = 0) => {
  const indent = '  ';
  const result = ast.map((el) => {
    if (el.children.length > 0) {
      return `${indent.repeat(lvl + 1)}${el.key}: ${render(el.children, lvl + 1)}`;
    }
    if (!(el.beforeValue)) {
      if (el.afterValue instanceof Object) {
        return `${indent.repeat(lvl)}+ ${el.key}: ${render(el.afterValue, lvl + 1)}`;
      }
      return `${indent.repeat(lvl)}+ ${el.key}: ${el.afterValue}`;
    }
    if (!el.afterValue) {
      if (el.beforeValue instanceof Object) {
        return `${indent.repeat(lvl)}- ${el.key}: ${render(el.beforeValue, lvl + 1)}`;
      }
      return `${indent.repeat(lvl)}- ${el.key}: ${el.beforeValue}`;
    }
    if (el.beforeValue === el.afterValue) {
      return `${indent.repeat(lvl + 1)}${el.key}: ${el.beforeValue}`;
    }
    if (el.afterValue instanceof Object) {
      return [`${indent.repeat(lvl)}+ ${el.key}: ${render(el.afterValue, lvl + 1)}`, `${indent.repeat(lvl)}- ${el.key}: ${el.beforeValue}`];
    }
    if (el.beforeValue instanceof Object) {
      return [`${indent.repeat(lvl)}+ ${el.key}: ${el.afterValue}`, `${indent.repeat(lvl)}- ${el.key}: ${render(el.beforeValue, lvl + 1)}`];
    }
    return [`${indent.repeat(lvl)}+ ${el.key}: ${el.afterValue}`, `${indent.repeat(lvl)}- ${el.key}: ${el.beforeValue}`];
  });
  return `{\n${indent.repeat(lvl + 1)}${_.flatten(result).join(`\n${indent.repeat(lvl + 1)}`)}\n${indent.repeat(2 * lvl)}}`;
};

const genDiff = (fstConfig, sndConfig) => {
  const parsedFile = config => makeParser[extname(config)](readFileSync(config, 'utf-8'));
  return render(makeAST(parsedFile(fstConfig), parsedFile(sndConfig)));
};

export default genDiff;

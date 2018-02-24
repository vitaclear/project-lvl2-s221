import _ from 'lodash';

const render = (ast, lvl = 0) => {
  const indent = '  ';
  const result = ast.map((el) => {
    if (el.type === 'hasChildren') {
      return `${indent.repeat(lvl + 1)}${el.key}: ${render(el.children, lvl + 1)}`;
    }
    if (el.type === 'added') {
      if (el.afterValue instanceof Object) {
        return `${indent.repeat(lvl)}+ ${el.key}: ${render(el.afterValue, lvl + 1)}`;
      }
      return `${indent.repeat(lvl)}+ ${el.key}: ${el.afterValue}`;
    }
    if (el.type === 'removed') {
      if (el.beforeValue instanceof Object) {
        return `${indent.repeat(lvl)}- ${el.key}: ${render(el.beforeValue, lvl + 1)}`;
      }
      return `${indent.repeat(lvl)}- ${el.key}: ${el.beforeValue}`;
    }
    if (el.type === 'unchanged') {
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

export default render;

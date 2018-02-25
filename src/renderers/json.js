import _ from 'lodash';

const render = (ast, lvl = 0) => {
  const indent = '  ';
  const closeIndent = indent.repeat(lvl);
  const lvlIndent = indent.repeat(lvl + 1);

  const stringifyValue = (value, level) => {
    const realIndent = indent.repeat(level);
    const longIndent = indent.repeat(level + 2);
    if (value instanceof Object) {
      const keys = Object.keys(value);
      const paires = keys.map(el => `${el}: ${value[el]}`);
      return `{\n${longIndent}${paires.join(`\n${longIndent}`)}\n${realIndent}}`;
    }
    return `${value}`;
  };

  const result = ast.map((el) => {
    if (el.type === 'nested') {
      return `${indent}${el.key}: ${render(el.children, lvl + 2)}`;
    }
    if (el.type === 'added') {
      return `+ ${el.key}: ${stringifyValue(el.afterValue, lvl + 2)}`;
    }
    if (el.type === 'removed') {
      return `- ${el.key}: ${stringifyValue(el.beforeValue, lvl + 2)}`;
    }
    if (el.type === 'unchanged') {
      return `${indent}${el.key}: ${stringifyValue(el.beforeValue, lvl + 2)}`;
    }
    return [`+ ${el.key}: ${stringifyValue(el.afterValue, lvl + 2)}`, `- ${el.key}: ${stringifyValue(el.beforeValue, lvl + 2)}`];
  });
  return `{\n${lvlIndent}${_.flatten(result).join(`\n${lvlIndent}`)}\n${closeIndent}}`;
};

export default render;

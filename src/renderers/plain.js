const render = (ast, lvl = '') => {
  const stringifyValue = (value) => {
    const resultString = value instanceof Object ? 'complex value' : `value '${value}'`;
    return resultString;
  };

  const result = ast.map((el) => {
    if (el.type === 'nested') {
      return `${render(el.children, `${lvl}${el.key}.`)}`;
    }
    if (el.type === 'added') {
      return `Property '${lvl}${el.key}' was added with ${stringifyValue(el.afterValue)}`;
    }
    if (el.type === 'removed') {
      return `Property '${lvl}${el.key}' was removed`;
    }
    if (el.type === 'unchanged') {
      return `Property '${lvl}${el.key}' was not changed`;
    }
    return `Property '${lvl}${el.key}' was updated from ${stringifyValue(el.beforeValue)} to ${stringifyValue(el.afterValue)}`;
  });
  return `${result.join('\n')}\n`;
};

export default render;

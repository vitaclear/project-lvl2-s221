const render = (ast, lvl = '') => {
  const stringifyValue = (value) => {
    const resultString = value instanceof Object ? 'complex value' : `value '${value}'`;
    return resultString;
  };

  const result = ast.map((el) => {
    switch (el.type) {
      case 'nested': return `${render(el.children, `${lvl}${el.key}.`)}`;
      case 'added': return `Property '${lvl}${el.key}' was added with ${stringifyValue(el.afterValue)}`;
      case 'removed': return `Property '${lvl}${el.key}' was removed`;
      case 'unchanged': return `Property '${lvl}${el.key}' was not changed`;
      default: return `Property '${lvl}${el.key}' was updated from ${stringifyValue(el.beforeValue)} to ${stringifyValue(el.afterValue)}`;
    }
  });
  return `${result.join('\n')}\n`;
};

export default render;

const render = (ast, lvl = '') => {
  const result = ast.map((el) => {
    if (el.type === 'hasChildren') {
      return `${render(el.children, `${lvl}${el.key}.`)}`;
    }
    if (el.type === 'added') {
      if (el.afterValue instanceof Object) {
        return `Property '${lvl}${el.key}' was added with complex value`;
      }
      return `Property '${lvl}${el.key}' was added with value: ${el.afterValue}`;
    }
    if (el.type === 'removed') {
      return `Property '${lvl}${el.key}' was removed`;
    }
    if (el.type === 'unchanged') {
      return `Property '${lvl}${el.key}' was not changed`;
    }
    if (el.afterValue instanceof Object) {
      return `Property '${lvl}${el.key}' was updated from '${el.beforeValue}' to complex value`;
    }
    if (el.beforeValue instanceof Object) {
      return `Property '${lvl}${el.key}' was updated from complex value to '${el.afterValue}'`;
    }
    return `Property '${lvl}${el.key}' was updated from '${el.beforeValue}' to '${el.afterValue}'`;
  });
  return `${result.join('\n')}\n`;
};

export default render;

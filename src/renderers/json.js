const render = (ast, lvl = 0) => {
  const indent = '  ';
  const closeIndent = indent.repeat(lvl);
  const lvlIndent = indent.repeat(lvl + 1);

  const stringifyValue = (value, level) => {
    const startIndent = indent.repeat(level);
    const longIndent = indent.repeat(level + 1);
    if (value instanceof Object) {
      const keys = Object.keys(value);
      const paires = keys.map(el => `${el}: ${value[el]}`);
      return `{\n${longIndent}${paires.join(`\n${longIndent}`)}\n${startIndent}}`;
    }
    return `${value}`;
  };

  const stringifyNode = (type, values, level) => {
    const startIndent = indent.repeat(level);
    const longIndent = indent.repeat(level + 1);
    const typeString = `${longIndent}type: ${type}\n`;
    const keys = Object.keys(values);
    const paires = keys.map(el => `${el}: ${stringifyValue(values[el], level + 1)}`);
    return `{\n${typeString}${longIndent}${paires.join(`\n${longIndent}`)}\n${startIndent}}`;
  };

  const result = ast.map((el) => {
    if (el.type === 'nested') {
      return `${el.key}: ${render(el.children, lvl + 1)}`;
    }
    if (el.type === 'added') {
      return `${el.key}: ${stringifyNode(el.type, { value: el.afterValue }, lvl + 1)}`;
    }
    if (el.type === 'removed') {
      return `${el.key}: ${stringifyNode(el.type, { value: el.beforeValue }, lvl + 1)}`;
    }
    if (el.type === 'unchanged') {
      return `${el.key}: ${stringifyNode(el.type, { value: el.beforeValue }, lvl + 1)}`;
    }
    return `${el.key}: ${stringifyNode(el.type, { newValue: el.afterValue, previousValue: el.beforeValue }, lvl + 1)}`;
  });
  return `{\n${lvlIndent}${result.join(`\n${lvlIndent}`)}\n${closeIndent}}`;
};

export default render;

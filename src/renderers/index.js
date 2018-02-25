import plainRenderer from './plain';
import visualRenderer from './visual';
import jsonRenderer from './json';

const render = {
  json: jsonRenderer,
  plain: plainRenderer,
  visual: visualRenderer,
};

const getRenderer = (ast, type = 'visual') => {
  const renderedAST = render[type](ast);
  return renderedAST;
};

export default getRenderer;

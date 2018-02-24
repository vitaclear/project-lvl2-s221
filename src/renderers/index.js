import plainRenderer from './plain';
import visualRenderer from './visual';

const render = {
  plain: plainRenderer,
  visual: visualRenderer,
};

const getRenderer = (ast, type = 'visual') => {
  const renderedAST = render[type](ast);
  return renderedAST;
};

export default getRenderer;

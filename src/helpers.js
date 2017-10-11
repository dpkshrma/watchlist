import Loadable from 'react-loadable';
import Loading from './components/Loading';

export const asyncLoad = opts => {
  return Loadable(Object.assign({}, {
    loading: Loading
  }, opts));
};

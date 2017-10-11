import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    {routes}
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

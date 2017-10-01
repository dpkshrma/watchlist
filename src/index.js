import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    {routes}
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

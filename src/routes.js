import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App, UserForm, NotFoundPage } from './components';

export default (
  <App>
    <Switch>
      <Route exact component={UserForm} path="/" />
      <Route component={NotFoundPage} />
    </Switch>
  </App>
);

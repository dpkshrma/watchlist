import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserForm, NotFoundPage } from './components';

export default (
  <Switch>
    <Route exact component={UserForm} path="/" />
    <Route component={NotFoundPage} />
  </Switch>
);

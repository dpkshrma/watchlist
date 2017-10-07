import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App, UserForm, SuggestionList, NotFoundPage } from './components';

const urlPrefix = process.env.PUBLIC_URL || '';

export default (
  <App>
    <Switch>
      <Route exact component={UserForm} path={`${urlPrefix}/`} />
      <Route exact component={SuggestionList} path={`${urlPrefix}/list`} />
      <Route component={NotFoundPage} />
    </Switch>
  </App>
);

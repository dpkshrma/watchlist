import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import { asyncLoad } from './helpers';

const UserForm = asyncLoad({
  loader: import('./components/UserForm'),
});
const SuggestionList = asyncLoad({
  loader: import('./components/SuggestionList'),
});

export const routes = (
  <App>
    <Switch>
      <Route exact path="/" component={UserForm} />
      <Route exact path="/list" component={SuggestionList} />
    </Switch>
  </App>
);

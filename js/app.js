import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {IndexRoute, Route, Router} from 'react-router';
import MessageApp from './components/MessageApp';
import MessageList from './components/MessageList';
import ViewerQueries from './queries/ViewerQueries';

import {createHashHistory} from 'history';
import {applyRouterMiddleware, useRouterHistory} from 'react-router';
const history = useRouterHistory(createHashHistory)({ queryKey: false });
const mountNode = document.getElementById('root');
import useRelay from 'react-router-relay';

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={history}
    render={applyRouterMiddleware(useRelay)}>
    <Route path="/"
      component={MessageApp}
      queries={ViewerQueries}>
      <IndexRoute
        component={MessageList}
        queries={ViewerQueries}
      />
    </Route>
  </Router>,
  mountNode
);

import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';

const { ConnectedRouter } = routerRedux;

/**
 * 如果当前组件不需要model
 * 请不要配置model属性会导致报错
 */
const routes = [{
  path: '/advertising',
  models: () => [
    import('./models/advertising/resourceslock'),
    import('./models/advertising/advertiser')],
  component: () => import('./routes/Advertising/')
}, {
  path: '/users',
  models: () => [import('./models/users/userList')],
  component: () => import('./routes/Users/'),
},{
  path: '/login',
  models: () => [import('./models/login')],
  component: () => import('./routes/login/'),
}, {
  path: '/platform',
  models: () => [import('./models/platform')],
  component: () => import('./routes/Platform/'),
}, {
  path: '*',
  component: () => import('./routes/PageNotFound/'),
}]

function RouterConfig({ history, app }) {
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/advertising" />)} />
          { routes.map(({ path, ...dynamics }, index) => {
            return (
              <Route
                key={index}
                exact
                path={path}
                component={dynamic({ app, ...dynamics })}
              />
            )
          }) }
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;

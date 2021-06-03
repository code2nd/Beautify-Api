import React from 'react'
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom'
import Loadable from '@loadable/component'
import App from '@/App'
import LayOut from '@/container/layout'
// import loading from '@/components/loading'
// import Guidance from '@/pages/guidance'

const Router = () => (
  <BrowserRouter>
    <App>
      <LayOut>
        <Switch>
          <Route 
            path="/" 
            exact={true}
            component={Loadable(() => import('@/pages/guidance')) } 
          />
          <Route 
            path="/management" 
            exact={true}
            component={Loadable(() => import('@/pages/management')) } 
          />
          <Route 
            path="/document" 
            exact={true}
            component={Loadable(() => import('@/pages/document')) } 
          />
          <Route 
            path="/404" 
            exact={true}
            component={Loadable(() => import('@/pages/404')) } 
          />
          <Redirect to="/404" />
        </Switch>
      </LayOut>
    </App>
  </BrowserRouter>
);

export default Router;
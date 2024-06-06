import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import AdminManagement from './views/admin-management'
import Home from './views/home'
import Login from './views/login'
import Portfolio from './views/portfolio'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AdminManagement} exact path="/admin" />
        <Route component={Home} exact path="/" />
        {/* <Route component={Login} exact path="/login" /> */}
        <Route component={Portfolio} exact path="/portfolio" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))



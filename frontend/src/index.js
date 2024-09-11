import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import './style.css'
import AdminManagement from './views/admin-management'
import Home from './views/home'
import Login from './views/login'
import Portfolio from './views/portfolio'
import ProjectId from './views/project-id'
import NotFound from './views/not-found'
import ProtectedRoute from './components/protectedroute'
import Contact from './views/contact'
import Logout from './components/logout'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <ProtectedRoute>
            <AdminManagement />
          </ProtectedRoute>
        </Route>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contact" component={Contact} />
        <Route path="/logout" component={Logout} />
        <Route path="/projects/:id" component={ProjectId} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)

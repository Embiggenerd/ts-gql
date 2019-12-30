import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  return (

    <BrowserRouter>
      <div>
        <header>
          <div><Link to="/login">Login</Link></div>
          <div><Link to="/register">Register</Link></div>
        </header>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}



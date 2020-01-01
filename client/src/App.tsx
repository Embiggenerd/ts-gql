import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Bye } from './pages/Bye';
import { setAccessToken } from './accessToken';
import { Header } from './pages/Header';

export const Routes: React.FC = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: "POST",
      credentials: 'include'
    }).then((x) => {
      x.json().then(json => {
        const { accessToken } = json
        setAccessToken(accessToken)
        setLoading(false)
      })
    })
  }, [])

  if (loading) {
    return <div>Loading</div>
  }
  return (

    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/bye" component={Bye} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}



import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Result from './views/ResultPage';
import Debug from './views/Debug';
import './App.css';

function App() {
  console.log('sss', process.env.REACT_APP_CLIENT_ID);
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/results' exact component={Result} />
          <Route path='/debug' exact component={Debug} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './index.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import About from './components/About';
import Contacts from './components/Contacts';
import Layout from './components/Layout';

const app = document.getElementById('app');

render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={About}></IndexRoute>
      <Route path="contacts" component={Contacts}></Route>
    </Route>
  </Router>
, app);

import React from 'react';
import InvoiceList from "./InvoiceList";
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import NotFound from './NoteFound';


const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={InvoiceList} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Root;

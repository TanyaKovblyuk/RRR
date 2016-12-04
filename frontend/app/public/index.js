import { render } from "react-dom";
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import Routing from "../constructor/routing";

const store = configureStore();

render(
  <Provider store={store}>
    < Routing />
  </Provider>,
  document.getElementById("container")
);

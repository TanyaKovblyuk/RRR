import { render } from "react-dom";
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';

import SPAView from "../constructor/SPAView.js";


const store = configureStore();

render(
  <Provider store={store}>
    < SPAView />
  </Provider>,
  document.getElementById("container")
);

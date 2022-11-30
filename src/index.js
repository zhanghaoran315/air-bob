import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
)
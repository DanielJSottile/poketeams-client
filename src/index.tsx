import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import { GeneralProvider } from './App/contexts/GeneralContext';
import './index.scss';
import { UserContextProvider } from './App/contexts/UserContext';
import * as serviceWorker from './serviceWorker';

const rootNode: HTMLElement | null = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <GeneralProvider>
          <App />
        </GeneralProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { GeneralProvider } from './contexts/GeneralContext';

const rootNode: HTMLElement | null = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

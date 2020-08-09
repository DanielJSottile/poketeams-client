import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {GeneralProvider} from './contexts/GeneralContext'; // THIS IS TEMPORARY

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

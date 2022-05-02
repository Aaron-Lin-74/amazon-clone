import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer, { initializer, initialState } from './store/reducer';
import { StateProvider } from './components/StateProvider';
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider
        initialState={initialState}
        reducer={reducer}
        initializer={initializer}
      >
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

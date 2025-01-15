import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import AppRouter from './routes/AppRouter';
import './styles.css';

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;

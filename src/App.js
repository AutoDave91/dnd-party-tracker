import React from 'react';

import Header from './Components/Header';
import routes from './routes';

import './style/reset.css';
import './style/responsive.css'
import './style/app.css';

function App() {
  return (
    <main className='App'>
      <Header />
      {routes}
    </main>
  );
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useSelector } from 'react-redux';


function App() {
  //redux хранилище в ./redux
  const state = useSelector(state=>state);
  const { userName } = state.app;
  const routes = useRoutes(userName);

  return (
      <BrowserRouter>
        <div className='container'>
            { routes }
        </div>
      </BrowserRouter>
  );
}

export default App;

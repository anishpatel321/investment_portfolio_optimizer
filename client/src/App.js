import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import InputPage from './pages/InputPage.js';
import OutputPage from './pages/OutputPage.js';


const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>} />
          <Route path='/input' element={<InputPage/>} />
          <Route path='/output' element={<OutputPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Advice from './pages/Advice/Advice';
import Horoscope from './pages/Horoscope/Horoscope';
import Choice from './pages/Choice/Choice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/horoscope' element={<Horoscope />} />
        <Route path='/advice' element={<Advice />} />
        <Route path='/choice' element={<Choice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

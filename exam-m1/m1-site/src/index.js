import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './app/App';
import Auteur from './app/Auteur';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
        <Route path="/auteurs" element={<Auteur />} />
      {/* Ajoutez d'autres routes ici si nécessaire */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Navbar from './components/Navbar';
import Template from './components/Template';
import Results from './components/Results';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/template" element={<Template/>} />
          <Route path="/results" element={<Results/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

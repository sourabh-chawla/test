import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DApp from './pages/DApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dapp" element={<DApp />} />
      </Routes>
    </Router>
  );
}

export default App;
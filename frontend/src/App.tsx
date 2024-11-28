import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Request from './components/requestRide/requestRide';
import Confirm from './components/confirmRide/confirmRide';
import GetRides from './components/getRideCuston/getRidesCuston';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Request />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/getRides" element={<GetRides />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
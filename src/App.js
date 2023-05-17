import logo from './logo.svg';
import './App.css';
import Repo from './Repo'
import Container from './Container';
import Allgraphs from './Allgraphs';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/graphs" element={<Allgraphs />} />
      </Routes>
    </Router>
  );
};

export default App;









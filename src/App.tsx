import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Solution from './pages/Solution';
import Emergency from './pages/Emergency';
import Schemes from './pages/Schemes';
import LocalHelp from './pages/LocalHelp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solution" element={<Solution />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="local-help" element={<LocalHelp />} />
        </Route>
      </Routes>
    </Router>
  );
}

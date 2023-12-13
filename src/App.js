import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Arvostelut from './pages/Arvostelut';
import Koti from './pages/Koti';
import Ryhmat from './pages/Ryhmat';
import Tili from './pages/Tili';
import Uutiset from './pages/Uutiset';
import NavBar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path = '/' element={<Koti />} />
          <Route path = '/uutiset' element={<Uutiset />} />
          <Route path = '/ryhmat' element={<Ryhmat />} />
          <Route path = '/arvostelut' element={<Arvostelut />} />
          <Route path = '/tili' element={<Tili />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

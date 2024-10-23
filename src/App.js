import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
// Components
const Home = () => (
  <div>
    <h1>Welcome to Comic Book Library</h1>
    <p>Explore your favorite Marvel characters and comics!</p>
  </div>
);

const Comics = () => (
  <div>
    <h2>Comics</h2>
    <p>This component is under construction. Check back later!</p>
  </div>
);

const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
            Home
          </NavLink>
          <NavLink to="/characters" className={({ isActive }) => isActive ? "active-link" : ""}>
            Characters
          </NavLink>
          <NavLink to="/comics" className={({ isActive }) => isActive ? "active-link" : ""}>
            Comics
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<BrowseCharacters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

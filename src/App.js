import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TitlePage from './pages/TitlePage'
import Pokemon from './pages/Pokemon'

import './App.css';

import imageHome from './image/home.gif'
function App() {


  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;

function Navigation() {

  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/titlepage" element={<TitlePage />} />
      <Route path="/pokemon" element={<Pokemon/>} />
    </Routes>
  </>)
}

function Home() {
  return (
    <>
      <div className="container">
        <img className="pokemonImage" src={imageHome} alt='home' />
        <Link to="/titlepage" className="viewPokemonButton">View Pokemon</Link>
      </div>
    </>)
}

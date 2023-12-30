import { Route, Routes } from "react-router-dom";
import Episodes from "./pages/Episodes";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import People from "./pages/People";
import Episode from "./pages/Episode";
import Genres from "./pages/Genres";
import Person from "./pages/Person";
import Navbar from "./components/Navbar";
import Seasons from "./pages/Seasons";
import SeasonEpisodes from "./pages/SeasonEpisodes";
import Shows from "./pages/Shows";
import TvShow from "./pages/TvShow";

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/episodes/:id" element={<Episode />} />
      <Route path="/seasons-episodes/:id" element={<SeasonEpisodes />} />
      <Route path="/seasons" element={<Seasons />} />
      <Route path="/seasons/:id" element={<Seasons />} />
      <Route path="/people" element={<People />} />
      <Route path="/people/:id" element={<Person />} />
      <Route path="/genre" element={<Genres />} />
      <Route path="/genre/:id" element={<Genre />} />
      <Route path="/tv-show/:id" element={<TvShow />} />
    </Routes>
    </>
  );
}

export default App;

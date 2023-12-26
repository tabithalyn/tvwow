import { useState } from "react";
import { TvShow } from "../data/ITvShow";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const Home = () => {
  const [tvShow, setTvShow] = useState<TvShow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const baseUrl = "https://api.tvmaze.com";

  // https://www.youtube.com/watch?v=zDwgTRkPkF4
  // https://github.com/LloydJanseVanRensburg/TV_SHOW_APP

  const getTvShow = () => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/singlesearch/shows?q=${searchQuery}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject(setErrorMessage("NOT FOUND. Try again."));
        }
      })
      .then((data) => {
        setTvShow([data]);
      })
      .catch(err => console.log(err))
    }
    fetchData();
  }

  return (
    <div className="w-full bg-sky-300 flex items-center justify-center flex-wrap py-3 gap-3">
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") getTvShow()
        }}
        placeholder="Search for a show"
        className="p-2 rounded"
        id="search-tv-show"
      />
      <button onClick={getTvShow} className="outline outline-sky-400 p-2 rounded bg-sky-200 hover:outline-sky-50 transition-all text-sky-600 hover:text-sky-700">Get TV Show</button>
      <div className="bg-blue-200 w-full flex justify-center">
        { tvShow ? (
          <div className="w-2/5">
            {tvShow.map((item:TvShow, index) => (
            <div key={index} className="w-full bg-blue-500 flex justify-center flex-wrap">
              <div className="w-full bg-sky-600 p-2">{item.name}</div>
              <div className="w-full bg-cyan-400 p-2">{(item.premiered).slice(0,4)} - {item.ended ? item.ended?.slice(0,4) : "present"
              }</div>
              <div><img src={item.image.medium} alt="tv show image" /></div>
              <div className="w-full bg-blue-300 p-2">{item.type}</div>
              <div className="w-full bg-sky-700 p-2 h-40 overflow-y-auto">{parse(item.summary)}</div>
              <div className="bg-violet-400">
                <Link to={`/seasons/${item.id}`}>Seasons</Link>
                <Link to={`/episodes/${item.id}`}>Episodes</Link>
              </div>
            </div>
          ))}
          </div>
        ) : <div>{errorMessage}</div> }
      </div>
    </div>
  );
}
 
export default Home;
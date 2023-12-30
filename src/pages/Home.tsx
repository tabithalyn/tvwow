import { useState } from "react";
import { TvShow } from "../data/ITvShow";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const Home = () => {
  const [tvShow, setTvShow] = useState<TvShow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [emptySearch, setEmptySearch] = useState<boolean>(false);

  const baseUrl = "https://api.tvmaze.com";

  const getTvShow = () => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/singlesearch/shows?q=${searchQuery}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          console.error();
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
    <div className="w-full flex items-center justify-center flex-wrap gap-3 h-screen mt-16">
      <div className="bg-softGreen w-3/5 flex justify-center px-3 py-4 gap-3 rounded-xl">
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            if (e.target.value === "") {
              setEmptySearch(true);
            } else {
              setSearchQuery(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery) getTvShow()
          }}
          placeholder="Search for a show"
          className="py-2.5 px-6 rounded"
          id="search-tv-show"
        />
        <button
          onClick={getTvShow}
          className="outline outline-tealMed py-2 px-6 rounded hover:outline-tealMed hover:bg-tealMed transition-all text-tealDark hover:text-[#22575c] text-sm"
          disabled={!emptySearch}
        >
          GO
        </button>
      </div>
        { tvShow ? (
          <div className="w-full flex justify-center py-5">
            <div className="w-3/5">
              {tvShow.map((item:TvShow, index) => (
              <div key={index} className="w-full bg-mutedBeige flex justify-center flex-wrap rounded-2xl overflow-hidden">
                <div className="w-full bg-tealMed p-2 text-center text-4xl font-extrabold">{item.name}</div>
                <div className="w-full bg-lightBlue p-2 text-center">{(item.premiered).slice(0,4)} - {item.ended ? item.ended?.slice(0,4) : "present"
                }</div>
                <div className="pt-2 flex justify-center"><img src={item.image.medium} alt="tv show image" className="w-4/5 rounded" /></div>
                <div className="w-full bg-mutedBeige p-2 flex flex-wrap justify-center gap-2">
                  <span className="bg-lightBlue p-2 text-[11px] text-tealDark font-medium uppercase rounded-full">{item.type}</span>
                  <span className="bg-tealMed p-2 text-[11px] text-tealDark font-medium uppercase rounded-full">{item.network.name}</span>
                  <span className="bg-softGreen p-2 text-[11px] text-tealDark font-medium uppercase rounded-full">{item.network.country.name}</span>
                </div>
                <div className="w-full bg-mutedBeige py-3 px-6 my-3 h-32 overflow-y-auto text-[15px]">{parse(item.summary)}</div>
                <div className="flex flex-wrap justify-center w-full gap-2 p-2 mb-4">
                  <Link to={`/seasons/${item.id}`} className="w-[48%] text-center p-2 rounded-xl bg-orangey uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#c68b50]">Seasons</Link>
                  <Link to={`/episodes/${item.id}`} className="w-[48%] text-center p-2 bg-pinky rounded-xl uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#ad5775]">Episodes</Link>
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen z-20">Search for a TV show!</div>
        )}
    </div>
  );
}
 
export default Home;
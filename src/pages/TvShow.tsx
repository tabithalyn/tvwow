import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { TvShow as TVSHOW } from "../data/ITvShow";
import { BounceLoader } from "react-spinners";
import parse from "html-react-parser";

const TvShow = () => {
  const [tvShowData, setTvShowData] = useState<TVSHOW[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}?embed=cast`;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setTvShowData([data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-3 h-screen mt-16">
      {isLoading ? <BounceLoader /> : null}
      <div className="w-full flex justify-center py-5">
        <div className="w-3/5">
          {tvShowData.map((item:TVSHOW, index) => (
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
            <div className="w-full bg-mutedBeige py-3 px-6 my-3 h-20 overflow-y-auto text-[15px]">{parse(item.summary)}</div>
            <div className="w-full bg-mutedBeige py-3 px-6 my-3 text-[15px]">
              {item._embedded.cast.filter((_item, index) => index < 10).map((cast, index) => (
                <div key={index}>
                  <p>{cast.person.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center w-full gap-2 p-2 mb-4">
              <Link to={`/seasons/${item.id}`} className="w-[48%] text-center p-2 rounded-xl bg-orangey uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#c68b50]">Seasons</Link>
              <Link to={`/episodes/${item.id}`} className="w-[48%] text-center p-2 bg-pinky rounded-xl uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#ad5775]">Episodes</Link>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
 
export default TvShow;
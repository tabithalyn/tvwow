import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEpisodes } from "../data/IEpisodes";
import { BounceLoader } from "react-spinners";
import parse from "html-react-parser";
import moment from "moment";

const SeasonEpisodes = () => {
  const [episodes, setEpisodes] = useState<IEpisodes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://api.tvmaze.com";
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/seasons/${id}/episodes`)
      .then((res) => {
        setIsLoading(true);
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          console.error();
        }
      })
      .then((data) => {
        setEpisodes(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
    }
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-wrap justify-center">
    <div>
      {isLoading && (
        <BounceLoader size={50} loading={isLoading} />
      )}
    </div>
      <div className="w-3/5 sm:w-4/5 xs:w-full flex flex-wrap gap-4 justify-center p-4">
        <div className="w-4/5 flex justify-start p-3">
          <button onClick={() => navigate(-1)} className="rounded-lg hover:bg-tealMed hover:text-[#2a4c56] py-1 px-3 transition-all">
            &larr; BACK
          </button>
        </div>
      {episodes ? episodes.map((item:IEpisodes, index:number) => (
        <div key={index} className="w-full bg-[#addce1] border border-[#0891b2] flex justify-center flex-wrap rounded-2xl shadow-md p-3">
          <h1 className="w-full flex flex-wrap justify-center text-3xl py-2 font-extrabold"><a href={item.url} className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-darkestTeal after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">{item.name}</a></h1>
          <p className="w-1/2 p-2 text-center flex flex-wrap">
            <span className="w-full text-xl">
            Season <b>{item.season}</b> Episode <b>{item.number}</b>
            </span>
            <span className="w-full my-2 font-light">
            {
              moment(item.airdate).format("Do MMM YYYY")
            }
            </span>
          </p>
          <div className="w-full flex justify-center mb-4">
            <img src={item.image.medium} alt={`Image from ${item.name}`} />
          </div>
          <div className="w-3/5 xs:w-4/5 bg-[#d7f2f5] p-4 max-h-40 overflow-y-auto rounded-xl mb-3 text-[15px] text-center">
            { item.summary ? (
              parse(item.summary.toString())
            ) : (
              parse('<span className="italic text-gray-500">No summary available.</span>')
            )}
          </div>
          <div className="w-full text-center tracking-wide font-black text-sm">📊 {item.rating?.average}</div>
        </div>
      )) : null}
      </div>
    </div>
  );
}
 
export default SeasonEpisodes;
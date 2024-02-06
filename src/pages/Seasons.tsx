import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import noImageAvailable from "../assets/no-image-available.png";
import moment from "moment";

type SeasonType = {
  id: number;
  number: number;
  network: {name:string};
  image: {medium: string};
  premiereDate: string;
  endDate: string;
  episodeOrder: number;
}

const Seasons = () => {
  const [seasonData, setSeasonData] = useState<SeasonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}/seasons`;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setSeasonData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
    {isLoading && (
      <BounceLoader size={50} loading={isLoading} />
    )}
    <div className="flex flex-wrap gap-4 justify-center my-5">
    {seasonData.map((season:SeasonType, index:number) => {
      return (
        <div key={index} className="bg-slate-200 col col-span-1 w-2/6 border border-slate-800 flex flex-wrap rounded-xl overflow-hidden">
          <span className="w-1/5">
            {
              season.image ? (
                <img src={season.image.medium} alt={`Season ${season.number}`} className="h-full" />
              ) : (
                <img src={noImageAvailable} alt="No Image Available" className="h-full" />
              )
            }
          </span>
          <span className="w-4/5 bg-[#71c2c9] flex flex-wrap">
            <span className="w-full bg-mutedBeige text-3xl font-extrabold flex items-end justify-left p-2">
              Season {season.number}
            </span>
            <span className="w-full bg-[#93c0c9] flex items-end justify-left text-[1.05rem] font-medium px-2">
              {season.network.name}
            </span>
            <span className="w-full bg-[#93c0c9] uppercase text-[0.9rem] px-2 tracking-wide items-start">
              {moment(season.premiereDate).format("L")} - {moment(season.endDate).format("L")}
            </span>
            <span className="w-full p-2 bg-tealDark">
              <span className="font-bold">{season.episodeOrder}</span> Episodes <Link to={`/seasons-episodes/${season.id}`} className="bg-orangey py-0.5 px-1 ml-1 rounded hover:bg-[#de76a9] hover:tracking-wide transition-all">View <i className="fa-solid fa-chevron-right text-sm"></i></Link>
            </span>
          </span>
        </div>
      )
    })}
    </div>
    </div>
  );
}
 
export default Seasons;
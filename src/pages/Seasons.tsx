import axios from "axios";
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
    const fetch = async () => {
      try {
        const {data} = await axios.get(url);
        setSeasonData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);

  return (
    <div>
    {isLoading && (
      <BounceLoader size={50} loading={isLoading} />
    )}
    <div className="flex flex-wrap gap-2 justify-center">
    {seasonData.map((season:SeasonType, index:number) => {
      return (
        <div key={index} className="bg-slate-200 col col-span-1 w-full border border-slate-800 flex flex-wrap rounded-xl overflow-hidden">
          <span className="w-1/5 bg-stone-400">
            {
              season.image ? (
                <img src={season.image.medium} alt={`Season ${season.number}`} />
              ) : (
                <img src={noImageAvailable} alt="No Image Available" />
              )
            }
          </span>
          <span className="w-4/5 bg-stone-300 flex flex-wrap">
            <span className="w-full bg-slate-400 text-3xl font-semibold flex items-end justify-left p-2">
              Season {season.number}
            </span>
            <span className="w-full bg-slate-300 flex items-start justify-left p-2">
              {season.network.name}
            </span>
            <span className="w-full bg-slate-600 uppercase text-sm p-2">
              {moment(season.premiereDate).format("MMM Do YYYY")} - {moment(season.endDate).format("MMM Do YYYY")}
            </span>
            <span className="w-full p-2 text-lg">
              {season.episodeOrder} Episodes (<Link to={`/seasons-episodes/${season.id}`}>View</Link>)
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
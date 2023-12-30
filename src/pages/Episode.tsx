import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

type EpisodeType = {
  id: string;
  name: string;
  season: number;
  number: number;
  rating: {average:number};
  airdate: string;
}

const Episode = () => {
  const [episodeData, setEpisodeData] = useState<EpisodeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}/episodes`;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setEpisodeData(data);
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
    <div className="flex flex-wrap gap-2 justify-center">
    {episodeData.map((ep:EpisodeType, id:number) => {
      return (
        <div key={id} className="bg-slate-200 w-1/4 border border-slate-800 flex flex-wrap">
          <span className="w-1/3 bg-slate-400">
            {ep.season < 10 ? (0) : ""}{ep.season}
            x
            {ep.number < 10 ? (0) : ""}{ep.number}
          </span>
          <span className="w-2/3 bg-slate-300">
            {ep.name}
          </span>
          <span className="w-1/3 bg-stone-400">
            {ep.rating.average}
          </span>
          <span className="w-2/3 bg-stone-200">
            {ep.airdate.slice(8,10)}
            {ep.airdate.slice(0,4)}
          </span>
        </div>
      )
    })}
    </div>
    </div>
  );
}
 
export default Episode;
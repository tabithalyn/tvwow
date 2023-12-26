import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IEpisodes } from "../data/IEpisodes";
import { BounceLoader } from "react-spinners";
import parse from 'html-react-parser';
import moment from "moment";

const SeasonEpisodes = () => {
  const [episodes, setEpisodes] = useState<IEpisodes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://api.tvmaze.com";
  const { id } = useParams();

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
    <>
    <div>
      {isLoading && (
        <BounceLoader size={50} loading={isLoading} />
      )}
    </div>
    {
      <div className="w-full flex flex-wrap gap-4 justify-center p-4">
      {episodes ? episodes.map((item:IEpisodes, index:number) => (
        <div key={index} className="w-full bg-blue-100 border border-blue-200 flex justify-center flex-wrap rounded-2xl shadow-md p-3">
          <h1 className="w-full text-center text-3xl py-2 font-extrabold">{item.name}</h1>
          <p className="w-1/2 p-2 text-center flex flex-wrap">
            <span className="w-full text-xl">
            Season <b>{item.season}</b> Episode <b>{item.number}</b>
            </span>
            <span className="w-full my-2">
            {
              moment(item.airdate).format("MMM Do YYYY")
            }
            </span>
          </p>
          
          <div className="w-4/5 bg-blue-200 p-4 max-h-40 overflow-y-auto rounded-xl mb-3">{parse(item.summary)}</div>
          <div className="w-full text-center">📊{item.rating?.average}</div>
        </div>
      )) : null}
      </div>
    }
    </>
  );
}
 
export default SeasonEpisodes;
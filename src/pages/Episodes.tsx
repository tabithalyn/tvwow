import { useEffect, useState } from "react";
import { IEpisodes } from "../data/IEpisodes";
import parse from 'html-react-parser';
import { Link, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const Episodes = () => {
  const [episodes, setEpisodes] = useState<IEpisodes[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
          return Promise.reject(setErrorMessage("NOT FOUND. Try again."));
        }
      })
      .then((data) => {
        setEpisodes([data]);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
    }
    fetchData();
  }, [id]);

  return (
    <div className="bg-blue-200 w-full flex justify-center">
      <div>
        {isLoading && (
          <BounceLoader size={50} loading={isLoading} />
        )}
      </div>
      { episodes ? (
        <div className="w-2/5">
          {episodes.map((item:IEpisodes, index:number) => (
          <div key={index} className="w-full bg-blue-500 flex justify-center flex-wrap">
            <h1>{id}</h1>
            <p className="w-full bg-sky-600 p-2">{item.name}</p>
            <p className="w-full bg-cyan-400 p-2">{item.airdate}</p>
            <p><img src={item.image.medium} alt="tv show image" /></p>
            <p className="w-full bg-blue-300 p-2">{item.season}</p>
            <p className="w-full bg-cyan-300 p-2">{item.number}</p>
            <p className="w-full bg-sky-700 p-2 max-h-40 overflow-y-auto">{parse(item.summary)}</p>
            <div className="bg-violet-400">{item.rating.average}</div>
          </div>
        ))}
        </div>
      ) : <p>{errorMessage}</p> }
      <div><Link to="/">Back</Link></div>
    </div>
  );
}

export default Episodes;
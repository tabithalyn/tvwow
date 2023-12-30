import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import parse from "html-react-parser";
import moment from "moment";
import { TvShow } from "../data/ITvShow";

const Shows = () => {
  const [showData, setShowData] = useState<TvShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = "https://api.tvmaze.com";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/shows?page=1`)
      .then((res) => res.json())
      .then((data) => {
        setShowData(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
    }

    fetchData();
  }, []);
  
  return (
    <>
    <div>
      {isLoading && (
        <BounceLoader size={50} loading={isLoading} />
      )}
    </div>
    {
      <div className="w-full flex flex-wrap gap-4 justify-center p-4">
      {showData ? showData.map((item:TvShow, index:number) => (
        <div key={index} className="w-1/4 bg-blue-100 border border-blue-200 flex justify-center flex-wrap rounded-2xl shadow-md p-3">
          <h1 className="w-full text-center text-3xl py-2 font-extrabold">{item.name}</h1>
          <p className="w-1/2 p-2 text-center flex flex-wrap">
            <span className="w-full my-2">
            {moment(item.premiered).format("YYYY")} - {item.ended ? (
              moment(item.ended).format("YYYY")
            ) : "Present"}
            </span>
          </p>
          
          <div className="w-4/5 bg-blue-200 p-4 max-h-40 overflow-y-auto rounded-xl mb-3 text-[15px]">{parse(item.summary)}</div>
          <div className="w-full text-center tracking-wide">STATUS: {item.status}</div>
        </div>
      )) : null}
      </div>
    }
    </>
  );
}
 
export default Shows;
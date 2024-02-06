import { useEffect, useState } from "react";
import { TvShow } from "../data/ITvShow";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import moment from "moment";

const Credits = ({ id }:{id:string}) => {
  const [showData, setShowData] = useState<TvShow[]>([]);
  const [isLoading ,setIsLoading] = useState(true);

  const baseUrl = "https://api.tvmaze.com";

  useEffect(() => {
    const url = `${baseUrl}/shows/${id}`;
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setShowData([data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);


  return (
    <>
      {isLoading ? <BounceLoader /> : null}
      {
        showData.filter((_item, index) => index < 10).map((show, id) => (
          <div key={id} className="w-full flex flex-wrap px-14 pb-2 border-b">
            <Link to={`/tv-show/${show.id}`} className="w-2/3 h-full">
              {show.name.toString()}
            </Link>
            <span className="w-1/3 text-right">{moment(show.premiered).format("YYYY")}</span>
          </div>
        ))
      }
    </>
  );
}
 
export default Credits;
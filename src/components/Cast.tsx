import { useState, useEffect } from "react";
import { TvShow } from "../data/ITvShow";
import { Link } from "react-router-dom";

const Cast = ({ i }:{i:number}) => {
  const [isLoading ,setIsLoading] = useState(true);
  const [creditsData, setCreditsData] = useState<TvShow[]>([]);

  const baseUrl = "https://api.tvmaze.com";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/shows/${i}?embed=cast`);
        const resData = await response.json();
        setCreditsData([resData]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [i]);

  return (
    <>
    <div className="w-full p-2 text-2xl font-bold -mt-6">
      Cast
    </div>
    <div className="w-full h-[250px] overflow-y-auto p-1 mb-2">
      {
        isLoading ? <h1>Loading...</h1> : null
      }
      {
        creditsData ? 
          (creditsData.map((x:TvShow, i) => (
            <div key={i} className="flex flex-wrap gap-2">
              {[...new Set(x._embedded.cast)].filter((_item, index) => index < 10).map((p, id) => (
                <span key={id} className="w-full border border-lightBlue p-1">
                  <Link to={`/people/${p.person.id}`} className="w-full h-full flex flex-wrap items-center">
                    <img src={p.person.image.medium} alt={p.person.name} className="w-[9%]" />
                    <span className="ml-4 text-lg font-medium">
                      {p.person.name}
                    </span>
                  </Link>
                </span>
              ))}
            </div>
          ))) : null
      }
    </div>
    </>
  );
}
 
export default Cast;
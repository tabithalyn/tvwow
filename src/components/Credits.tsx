import { useState, useEffect } from "react";
import { TvShow } from "../data/ITvShow";

const Credits = ({ i }:{i:number}) => {
  const [isLoading ,setIsLoading] = useState(true);
  const [creditsData, setCreditsData] = useState<TvShow[]>([]);

  const baseUrl = "https://api.tvmaze.com";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/shows/${i}`);
        const resData = await response.json();
        setCreditsData(resData);
        console.log(resData);
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
    {
      isLoading ? <h1>Loading...</h1> : null
    }
    {
      creditsData.map((x:{name:string}, i) => (
        <div key={i}>
          {x.name}
        </div>
      ))
    }
    </>
  );
}
 
export default Credits;
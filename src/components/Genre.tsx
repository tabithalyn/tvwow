import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TvShow } from "../data/ITvShow";
import { BounceLoader } from "react-spinners";



const Genre = () => {
  const [genres, setGenres] = useState<TvShow[]>([]);
  const [loading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}`;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setGenres([data]);
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
    { loading ? <BounceLoader /> : null }
    {
      genres.map((show, index) => (
        <div key={index}>
          {show.genres.map((genre, index) => (
            <p key={index}>
              {genre}
            </p>
          ))}
        </div>
      ))
    }
    </>
  );
}
 
export default Genre;
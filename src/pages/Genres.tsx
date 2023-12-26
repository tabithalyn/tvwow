import axios from "axios";
import { useState, useEffect } from "react";

const Genres = () => {
  const [types, setTypes] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}`;
    setIsLoading(true);
    const fetch = async () => {
      try {
        const {data} = await axios.get(url);
        setTypes(data.type);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);

  /*
  Drama
  Horror
  Romance
  Science-Fiction
  Anime
  Thriller
  Mystery
  Supernatural
  Crime
  Action
  Comedy
  History
  Family
  Sports
  Music
  Western
  War
  */

  // TYPE:
  // Scripted
  // Talk Show
  // Reality
  // Game Show
  // News
  // Documentary
  // Panel Show
  // Variety


  return (
    <>
    Get from the show main information (Type: "" string)
    Then filter?
    {
      show.type.filter
    }
    </>
  );
}
 
export default Genres;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

type PersonType = {
  id: number;
  name: string;
  country: {name: string};
  birthday?: string;
  deathday?: string;
  gender: string;
  image: {original:string};
  url: string;
}

const Person = () => {
  const [personData, setPersonData] = useState<PersonType[]>([]);
  const [isLoading ,setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.tvmaze.com/search/people?q=${id}`;
    setIsLoading(true);
    const fetch = async () => {
      try {
        const {data} = await axios.get(url);
        setPersonData(data);
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
    <div>
      {personData.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <p>{p.gender}</p>
          <p>{p.country.name}</p>
          <p>
            <img src={p.image.original} alt={p.name} className="w-[200px]" />
          </p>
          <p>
            {p.birthday ? (
              <span>{p.birthday}</span>
            ) : null}
            {p.deathday ? (
              <span>{p.deathday}</span>
            ) : null}
          </p>
          <p>
            <a href={p.url}>TV Maze page</a>
          </p>
        </div>
      ))}
    </div>
    </div>
  );
}
 
export default Person;
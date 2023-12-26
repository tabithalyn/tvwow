import { useState } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

type PeopleType = {
  name: string;
}

const People = () => {
  const [peopleData, setPeopleData] = useState<PeopleType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getPerson = () => {
    const fetchData = async () => {
      await fetch(`https://api.tvmaze.com/search/people?q=${searchTerm}`)
      .then((res) => {
        setIsLoading(true);
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject(setErrorMessage("NOT FOUND. Try again."));
        }
      })
      .then((data) => {
        setPeopleData(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
    }
    fetchData();
  }

  return (
    <div>
      {isLoading && (
        <BounceLoader size={50} loading={isLoading} />
      )}
      <div className="w-full flex justify-center p-4">
        <input
          type="text"
          id="people-search"
          name="peopleSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-600 w-1/3"
          placeholder="Search for a person..."
        />
        <button onClick={getPerson} className="border border-gray-500 p-3">Search</button>
      </div>
      <div className="text-black">
      {peopleData ? (
        peopleData.map((person, index) => (
          <Link to={`/${person.name}`} key={index}>{person.name}</Link>
        ))
      ) : (<div>{errorMessage}</div>)}
      </div>
    </div>
  );
}
 
export default People;
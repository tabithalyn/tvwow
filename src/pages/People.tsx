import { useState } from "react";
import { Person } from "../data/IPerson";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-available.png";
import moment from "moment";

const People = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [emptySearch, setEmptySearch] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://api.tvmaze.com";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/search/people?q=${searchTerm}`);
      const data = await response.json();
      setPeopleData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-3 h-screen mt-10">
      <div className="bg-softGreen w-3/5 flex justify-center px-3 py-4 gap-3 rounded-xl">
        <input
          type="text"
          id="people-search"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value === "") {
              setEmptySearch(true);
            } else {
              setEmptySearch(false);
              setSearchTerm(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm) fetchData()
          }}
          className="p-2 border border-gray-600 w-1/3"
          placeholder="Search for a person..."
        />
        <button onClick={fetchData} className="border border-gray-500 p-3" disabled={!emptySearch}>Search</button>
      </div>
      <div className="text-black w-full flex items-center justify-center flex-wrap">
      {loading ? <p>Loading...</p> : null}
      {
        peopleData && Object.values(peopleData).length > 0 ? (
          <div className="w-full justify-center py-5 flex flex-wrap gap-3">
            {peopleData.map((item:Person, index) => (
              <div key={index} className="flex flex-wrap w-1/4 border border-teal-500 rounded-2xl shadow-xl">
                <div key={index} className="w-full bg-mutedBeige flex justify-center flex-wrap rounded-2xl overflow-hidden">
                  <div className="w-full bg-tealMed p-2 text-center text-xl font-extrabold">{item.person.name}</div>
                  {item.person.birthday ? (
                    <div className="w-full bg-lightBlue p-2 text-center text-sm">
                      {moment(item.person.birthday).format("ll")}
                      {item.person.deathday ? (
                        <span> - {moment(item.person.deathday).format("ll")}</span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className={`pt-2 flex justify-center ${!item.person.birthday && "pt-4"}`}>
                    {item.person.image ? (
                      <img src={item.person.image.medium} alt={`Image of ${item.person.name}`} className="w-4/5 rounded" />
                    ) : (
                      <img src={noImage} alt="Image not found" className="w-4/5 rounded" />
                    )}
                  </div>
                  <div className="w-full bg-mutedBeige p-2 flex flex-wrap justify-center gap-2">
                    {item.person.gender ? (
                      <span className={`bg-lightBlue p-2 text-[11px] text-tealDark font-medium uppercase rounded-full ${!item.person.birthday && "pt-2 pb-0 pr-2.5"}`}>{item.person.gender}</span>
                    ) : null}
                    {item.person.country ? (
                      <span className="bg-tealMed p-2 text-[11px] text-tealDark font-medium uppercase rounded-full">{item.person.country.name}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap justify-center w-full gap-2 p-2 mb-4">
                    <Link to={`/people/${item.person.id}`} className={`w-[48%] text-center p-2 bg-pinky rounded-xl uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#ad5775] ${!item.person.birthday && "pt-2 h-[83%]"}`}>Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null
      }
      </div>
    </div>
  );
}

export default People;
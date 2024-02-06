import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { SinglePerson  } from "../data/IPerson";
import moment from "moment";
import noImage from "../assets/no-image-available.png";
import Credits from "../components/Credits";

const Person = () => {
  const [personData, setPersonData] = useState<SinglePerson|null>(null);
  const [isLoading ,setIsLoading] = useState(true);
  const { id } = useParams();

  const baseUrl = "https://api.tvmaze.com";

  useEffect(() => {
    const url = `${baseUrl}/people/${id}?embed=castcredits`;
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPersonData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="w-[95vw] h-[90vh] flex justify-center items-center">
    {isLoading ? (
      <BounceLoader size={50} loading={isLoading} />
    ) : null}
    <div>
      {
        personData ? (
          <div className="w-full justify-center py-5 flex flex-wrap gap-3 mt-48">
            <div key={personData.id} className="flex flex-wrap w-2/4 border border-teal-500 rounded-2xl shadow-xl">
              <div className="w-full bg-mutedBeige flex justify-center flex-wrap rounded-2xl overflow-hidden">
                <div className="w-full bg-tealMed p-2 text-center text-xl font-extrabold">{personData.name}</div>
                {personData.birthday ? (
                  <div className="w-full bg-lightBlue p-2 text-center text-sm">
                    {moment(personData.birthday).format("ll")}
                    {personData.deathday ? (
                      <span> - {moment(personData.deathday).format("ll")}</span>
                    ) : null}
                  </div>
                ) : null}
                <div className={`pt-2 flex justify-center ${!personData.birthday && "pt-4"}`}>
                    {personData.image ? (
                      <img src={personData.image.medium} alt={`Image of ${personData.name}`} className="w-4/5 rounded" />
                    ) : (
                      <img src={noImage} alt="Image not found" className="w-4/5 rounded" />
                    )}
                  </div>
                  <div className="w-full bg-mutedBeige p-2 flex flex-wrap justify-center gap-2">
                    {personData.gender ? (
                      <span className={`bg-lightBlue p-2 text-[11px] text-tealDark font-medium uppercase rounded-full ${!personData.birthday && "pt-2 pb-0 pr-2.5"}`}>{personData.gender}</span>
                    ) : null}
                    {personData.country ? (
                      <span className="bg-tealMed p-2 text-[11px] text-tealDark font-medium uppercase rounded-full">{personData.country.name}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-1 w-3/4 justify-center h-[200px] overflow-y-auto my-4">
                    {personData._embedded.castcredits.map((c, index) => (
                      <div key={index} className="flex flex-wrap w-full p-2">
                        <Credits id={(c._links.show.href).slice(29)} />
                      </div>
                    ))}
                  </div>
                <div className="flex flex-wrap justify-center w-full gap-2 p-2 mb-4">
                  <a href={personData.url} className={`w-[48%] text-center p-2 hover:-mx-1 bg-pinky rounded-xl uppercase text-[12px] font-medium hover:tracking-wider transition-all hover:bg-opacity-80 border border-transparent hover:border hover:border-[#ad5775] ${!personData.birthday && "pt-2 h-[83%]"}`}>TV Maze page</a>
                </div>
                </div>
              </div>
          </div>
        ) : (
          <h1>Nothing found.</h1>
        )
      }
    </div>
    </div>
  );
}
 
export default Person;
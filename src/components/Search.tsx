import { useEffect, useState } from "react";
import ShowResults from "./ShowResults";

const Search = () => {
  const [show, setShow] = useState({ name: "" });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: { target: { value: string; }; }) => {
    setIsSubmitted(false);
    setShow({ name: e.target.value });
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (isSubmitted && show.name.length > 0) {
      fetch(`https://api.tvmaze.com/search/shows?q=${show.name}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log(res.status);
            throw new Error((res.status).toString());
          }
        })
        .then((json) => {
          console.log(json);
          setError(null);
          setData(json);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
      setShow({ name: "" });
    }
  }, [isSubmitted, show.name]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          onChange={handleChange}
          value={show.name}
          className="input"
        />
        <button type="submit">Search</button>
      </form>
      <ShowResults data={data} error={error} />
    </div>
  );
}
 
export default Search;
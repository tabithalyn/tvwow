import { TvShow } from "../data/ITvShow";
import noImageAvailable from "../assets/no-image-available.png";

const ShowResults = (props: { error: null; data: [] | null; }) => {
  if (props.error !== null) {
    return <h1>An error occurred.</h1>
  }
  if (props.data !== null && props.error === null) {
    if (!props.data) {
      return (
        <div>
          <h1>No matches found.</h1>
        </div>
      );
    }
  }

  const listItem = props.data;

  return (
    <>
    {
     listItem?.map((element:TvShow) => (
          <li key={element.id}>
            <div>
              <a href={element.url}>
                {element.name}
              </a>
            </div>
            <div>
              {element.image ? (<img src={element.image.medium} alt={element.name} />) : (<div><img src={noImageAvailable} /></div>)}
            </div>
          </li>
        )
     )
    }
    <ul>
      {listItem}
    </ul>
    </>
  );
}
 
export default ShowResults;
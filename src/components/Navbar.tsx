import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around">
    <Link to="/">Home</Link>
    <Link to="/episodes">Episodes</Link>
    <Link to="/people">People</Link>
    </div>
  );
}
 
export default Navbar;
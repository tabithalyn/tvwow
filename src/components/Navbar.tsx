import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around p-3 bg-mutedBeige">
      <Link to="/" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-orangey after:w-[140%] after:-ml-2 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Home</Link>
      <Link to="/shows" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-orangey after:w-[140%] after:-ml-3 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">Shows</Link>
      <Link to="/people" className="relative w-fit block after:block after:content-[''] after:absolute after:h-[5px] after:bg-orangey after:w-[140%] after:-ml-2.5 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">People</Link>
    </div>
  );
}
 
export default Navbar;
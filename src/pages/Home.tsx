
const Home = () => {

  return (
    <div className="flex flex-wrap w-full justify-center items-center mt-20">
      <div className="text-6xl w-3/6 flex justify-left tracking-tight items-end mx-10 font-delicious">
        TV Maze Data Search
      </div>
      <div className="w-3/6 bg-mutedBeige rounded-lg flex items-center justify-center gap-2 p-20 mx-10">
        <span>
          Navigate to <a href="/shows" className="font-extrabold hover:underline transition-all">Shows</a> to search for a show, or navigate to <a href="/people" className="font-extrabold hover:underline transition-all">People</a> to search for an actor!
        </span>
      </div>
    </div>
  );
}
 
export default Home;
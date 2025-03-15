import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 text-black shadow-md">
      <div className=" p-4 flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-lg lg:text-2xl font-bold">RealEstate</h1>
        <form className="bg-slate-100 rounded-lg flex items-center px-2 py-1 min-w-[25%] justify-between">
          <input
            type="text"
            placeholder="Search"
            className="p-1 min-w-[90%] bg-transparent h-8 w-28 outline-0 text-[16px] text-slate-500"
          />
          <button className="text-slate-500 hover:text-slate-700 cursor-pointer">
            <FaSearch />
          </button>
        </form>

        <nav>
          <ul className="flex lg:space-x-4 justify-center items-center">
            <li>
              <Link
                to="/"
                className="hover:underline hidden lg:inline text-[16px]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline  hidden lg:inline text-[16px] "
              >
                About
              </Link>
            </li>
            <li>
              {currentUser ? (
                <Link to="/profile" className="hover:underline text-[16px]">
                  <img
                    src={currentUser.avatar}
                    className="w-10 border rounded-[50%]"
                  />
                </Link>
              ) : (
                <Link to="/sign-in" className="hover:underline text-[16px]">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

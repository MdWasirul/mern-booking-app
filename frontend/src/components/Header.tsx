import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-5 ">
      <div className="container mx-auto flex justify-between  ">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center font-bold text-white px-3 hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center font-bold text-white px-3 hover:bg-blue-600"
                to="/my-hotel"
              >
                My Hotels
              </Link>
              <SignOut />
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

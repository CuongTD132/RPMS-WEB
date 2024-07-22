import { NavLink } from "react-router-dom";
import Button from "../UI/Button";
import signOut from "../../assets/logout.svg";
import avatar from "../../assets/icons/User.png";
export default function Navbar() {
  const currentUser = JSON.parse(sessionStorage.getItem("userName")!);
  return (
    <>
      <nav
        id="navbar-header"
        className="flex justify-between items-center px-5 py-2"
      >
        <ul className="flex space-x-5">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/accounts"
              end
            >
              Accounts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/departments"
            >
              Departments
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center ml-auto space-x-4">
        <div className="flex items-center">
          <img
            className="rounded-full w-8 h-8 mr-2 border-2 border-gray-600"
            alt="Avatar"
            src={avatar}
          />
          <p>Welcome, {currentUser}</p>
        </div>
        <Button
          className="border bg-slate-200 border-slate-300 hover:bg-slate-300 hover:text-black rounded-md items-center text-gray-500"
          to="/"
          onClick={() => sessionStorage.clear()}
        >
          <img className="w-8 h-8" title="Sign Out" src={signOut} />
        </Button>
      </div>
    </>
  );
}

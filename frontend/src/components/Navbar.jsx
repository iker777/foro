import { Link } from 'react-router-dom';
import userIcon from "../assets/icons/userIcon.svg";
import { useState } from 'react';
import { UserConfigPage } from '../pages/UserConfigPage';

export const Navbar = () => {
  const [dropDown, setDropdown] = useState(false);
  const [userConfig, setUserConfig] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href="/login";
  }
  const Links = (
    <>
      <li className="mx-2 text-white hover:underline active:text-stone-300">
        <Link to="/">Main Wall</Link>
      </li>
      {!localStorage.getItem("user") && (
        <>
          <li className="mx-2 text-white hover:underline active:text-stone-300">
            <Link to="/login">Login</Link>
          </li>
          <li className="mx-2 text-white hover:underline active:text-stone-300">
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
      {localStorage.getItem("user") && (
        <li className="mx-2 text-white hover:underline active:text-stone-300">
          <Link to="/userPage">User Page</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <nav className="w-full p-5 flex justify-between items-start sticky top-0 left-0 z-10 bg-zinc-900 bg-opacity-90">
        <div
          className="relative pt-2 md:hidden"
          onClick={() => setDropdown(!dropDown)}
        >
          {dropDown ? (
            <>
              <div
                className="w-5 bg-white rounded m-1 rotate-45 absolute top-0"
                style={{ height: "2px" }}
              ></div>
              <div
                className="w-5 bg-white rounded m-1 -rotate-45 absolute top-0"
                style={{ height: "2px" }}
              ></div>
            </>
          ) : (
            <>
              <div
                className="w-5 bg-white rounded m-1"
                style={{ height: "2px" }}
              ></div>
              <div
                className="w-5 bg-white rounded m-1"
                style={{ height: "2px" }}
              ></div>
              <div
                className="w-5 bg-white rounded m-1"
                style={{ height: "2px" }}
              ></div>
            </>
          )}
        </div>
        <ul className="hidden md:flex">{Links}</ul>
        {localStorage.getItem("user") && (
          <div className="flex flex-col items-center justify-center">
            <div
              className="md:w-auto rounded-lg p-1 hover:bg-white hover:bg-opacity-10 active:bg-opacity-20"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <img src={userIcon} className="w-10 float-right" />
            </div>
            {userDropdown && (
              <div className="flex flex-col">
                <button
                  className="text-white hover:underline"
                  onClick={() => setUserConfig(true)}
                >
                  Settings
                </button>
                <button className="text-white hover:underline" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {dropDown && (
        <ul className="w-full flex justify-center items-center flex-col mb-8 z-10 top-16 bg-zinc-900 bg-opacity-90 left-0 sticky">
          {Links}
        </ul>
      )}
      {userConfig && <UserConfigPage setUserConfig={setUserConfig} />}
    </>
  );
}

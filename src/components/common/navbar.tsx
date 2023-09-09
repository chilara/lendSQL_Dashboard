import { FC, MouseEventHandler } from "react";
import searchIcon from "../../images/svgs/search-icon.svg";
import logo from "../../images/svgs/logo.svg";
import bell from "../../images/pngs/bell.png";
import avatar from "../../images/pngs/avatar.png";
import caretDown from "../../images/svgs/caret-down.svg";

export const Navbar: FC<{
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
}> = ({ toggleMenu }) => {
  return (
    <>
      <div
        className="fixed all-corn-box-shadow
        } top-0 px-29px lg:px-4px z-3 left-0 right-0 flex flex-align-center flex-space-between bg-white py-6px lg:py-none"
      >
        <img src={logo} className="lg:ml-2rem" alt="logo-img" />
        <div className="w-30p grey-border-color p-9px rounded-sm bw-1 b-solid flex-align-center mr-10rem relative lg:block d-none">
          <input
            placeholder="search for anything..."
            className="w-90p no-outline b-none"
          />
          <span className="pri-bg-color-2 w-40px absolute right-0 top-0 bottom-0 flex flex-align-center rounded-sm-tr rounded-sm-br flex-justify-center">
            <img src={searchIcon} alt="search-icon" />
          </span>
        </div>
        <div className="flex flex-align-center">
          <img
            src={bell}
            className="w-20px h-20px pointer lg:d-none flex mr-8px"
            alt="bell-icon"
          />
          <button
            className="lg:d-none block bg-none b-none pointer"
            onClick={toggleMenu}
          >
            <p className="hamburger" />
            <p className="hamburger my-6px" />
            <p className="hamburger" />
          </button>
        </div>
        <div className="d-none lg:flex flex-space-around flex-align-center row w-30p mr-3p">
          <p></p>
          <p></p>
          <p className="pri-text-color-1 underline pointer">Docs</p>
          <img src={bell} className="w-20px h-20px pointer" alt="bell-icon" />
          <div className="flex row flex-align-center pointer">
            <img
              src={avatar}
              alt="avatar"
              className="rounded-full w-45px h-45px"
            />
            <span className="bold">
              <small className="pri-text-color-1 mx-8px">Ayodeji</small>
              <img src={caretDown} alt="caret-down" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

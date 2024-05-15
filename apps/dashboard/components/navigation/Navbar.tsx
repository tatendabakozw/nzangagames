/* eslint-disable @typescript-eslint/ban-types */
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { data } from "@utils/data";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Store } from "@context/Store";
import { ContextType } from "@utils/types";
import ThemeToggler from "@components/buttons/ThemeToggle";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const { dispatch } = useContext<ContextType>(Store);
  const { pathname } = router;

  const [show_menu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <div className="w-full main-border-b flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-row items-center space-x-4 py-4 ">
        <button
          onClick={() => setShowMenu(!show_menu)}
          className="flex md:hidden"
        >
          {show_menu ? (
            <XMarkIcon height={16} width={16} />
          ) : (
            <Bars3Icon height={16} width={16} />
          )}
        </button>
        <div className="flex flex-row items-center pl-2  space-x-2">
          {/* <Image src={'/icon.svg'} width={20} height={20} alt="site logo" className='rounded' /> */}
          <p className="text-lg font-semibold text-slate-900 pr-8">
            Nzanga<span className="text-primary-original">Games</span>
          </p>
        </div>

        <div
          className={`md:flex hidden flex-row items-center space-x-4 text-sm`}
        >
          {data.nav_options.map((item, index) => (
            <Link
              href={item.location}
              key={index}
              className={`${
                pathname === item.location
                  ? "text-primary-original dark:text-white font-semibold"
                  : "main-link-text "
              }  hover:font-medium`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex-1" />

        <ThemeToggler />
        <button
          onClick={logoutHandler}
          className="main-link-text dark:hover:bg-slate-800 hover:bg-slate-100 p-1 rounded-full"
        >
          <ArrowRightOnRectangleIcon height={20} width={20} />
        </button>
      </div>
      {show_menu && (
        <div
          className={`flex md:hidden flex-col items-center pb-4 space-6-4 text-sm px-4`}
        >
          {data.nav_options.map((item, index) => (
            <Link
              href={item.location}
              key={index}
              className={`${
                pathname === item.location
                  ? "text-primary-original dark:text-white font-semibold"
                  : "main-link-text "
              }  hover:font-semibold`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

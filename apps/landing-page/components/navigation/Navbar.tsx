import { useRouter } from "next/router";
import React, { useContext } from "react";
import { nav_options } from "apps/landing-page/utils/data";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const { pathname } = router;

  const logoutHandler = () => {};

  return (
    <div className="main-border-b top-0 absolute w-full z-50 bg-none">
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-row items-center justify-between space-x-4 py-4 ">
        <div className="nams">
          <p className="flex flex-row items-center text-lg uppercase font-bold text-white">
            Nzanga <span className="text-primary-original pl-2"> Games</span>
          </p>
        </div>
        <div className="center flex flex-row items-center text-white space-x-4">
          {nav_options.map((item, index) => (
            <p key={item.location}>{item.name}</p>
          ))}
        </div>
        <div className="right flex flex-row items-center space-x-4 capitalize font-medium text-sm ">
          <Link href={"http://localhost:4201/register"} className="text-white">
            Sign Up
          </Link>
          <Link
            href={"http://localhost:4201"}
            className="bg-primary-original text-white px-6 py-2 rounded-full"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

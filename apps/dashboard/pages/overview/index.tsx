import OverviewHeading from "@components/page-sections/overview-sections/OverviewHeading";
import ProjectItem from "@components/project-items/ProjectItem";
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "@layouts/DashboardLayout";
import React, { useState } from "react";

const Overview = () => {
  const [selected_option, setSelectedOption] = useState({
    name: "Active",
    _id: "active",
  });
  const tap_options = [
    { name: "Active", _id: "active" },
    { name: "Suspended", _id: "suspended" },
    { name: "All", _id: "all" },
  ];

  const projects = [
    {
      name: "Games Played",
      _id: "hurudza",
      link: "https://example.digiforge.app",
      createdAt: "3",
      branch: "available",
      status: "success",
      Icon: PlayIcon,
    },
    {
      name: "All Games",
      _id: "daypitch",
      link: "https://daypitch.com",
      createdAt: "3",
      branch: "available",
      status: "success",
      Icon: PuzzlePieceIcon,
    },
    {
      name: "Players",
      _id: "asd232JK",
      link: "https://example.com",
      createdAt: "8",
      branch: "available",
      status: "success",
      Icon: UserGroupIcon,
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-primary py-16 min-h-screen">
        <div className="max-w-7xl w-full mx-auto px-4 md:space-y-16 space-y-8">
          {/* heading */}
          <OverviewHeading />
          {/* search and filter */}
          <div className="flex flex-row items-center space-x-4 w-full">
            <div className="flex flex-row items-center flex-1 bg-primary main-border text-sm rounded-lg px-2 space-x-4">
              <MagnifyingGlassIcon
                height={20}
                width={20}
                className="text-zinc-400"
              />
              <input
                type="text"
                className="border-none outline-none flex-1 py-2 text-zinc-700"
                placeholder="search anything"
              />
            </div>
            <div className="md:flex hidden flex-row items-center text-sm  bg-primary rounded-lg divide-x-[1px] divide-zinc-200 main-border  ">
              {tap_options.map((item) => (
                <button
                  onClick={() => setSelectedOption(item)}
                  key={item._id}
                  className={`${
                    item._id === selected_option._id
                      ? "text-primary-original "
                      : "text-zinc-700 "
                  } px-4 py-2`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          {/* project items */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="md:col-span-2 col-span-1 flex flex-col space-y-4 ">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {projects.map((item) => (
                  <ProjectItem
                    Icon={item.Icon}
                    link={item.link}
                    key={item._id}
                    name={item.name}
                    createdAt={item.createdAt}
                    branch={item.branch}
                    status={item.status}
                  />
                ))}
              </div>
              <div className="bg-primary flex flex-col main-border gap-4 p-4 space-y-2 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <p className=" font-semibold">Top scorers</p>
                  <p className="text-zinc-400 text-xs font-medium">
                    Here is who has been playing better than you.
                  </p>
                </div>
                <div className="grid grid-cols-3 text-sm font-semibold heading-text">
                  <div className="col-span-1">Player</div>
                  <div className="col-span-1">Game</div>
                  <div className="col-span-1">Score</div>
                </div>
                <div className="grid grid-cols-3 text-sm text-zinc-700s">
                  <div className="col-span-1">Munashe</div>
                  <div className="col-span-1">Chii Ichi</div>
                  <div className="col-span-1">6</div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-primary flex flex-col main-border gap-4 p-4 space-y-4 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <p className=" font-semibold">Last games played</p>
                  <p className="text-zinc-400 text-xs">Game session history.</p>
                </div>
                <div className="bg-secondary flex flex-row main-border gap-4 p-4 rounded-lg">
                  <div className="flex-1 flex flex-row items-center space-x-4">
                    <div className="avatar h-10 w-10 flex-shrink-0 rounded-full bg-primary-original grid items-center justify-center content-center main-border">
                      <PuzzlePieceIcon
                        height={24}
                        width={24}
                        className={"text-white"}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-slate-900 font-semibold">
                        {"Main game"}
                      </p>
                      <div className="flex flex-row items-center text-xs text-slate-500 space-x-1 font-medium">
                        <p className="">{"20 minutes ago"}</p>
                        <p className="text-md">&bull;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;

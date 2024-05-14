import OverviewHeading from '@components/page-sections/overview-sections/OverviewHeading';
import ProjectItem from '@components/project-items/ProjectItem';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@layouts/DashboardLayout';
import React, { useState } from 'react';

const Overview = () => {
  const [selected_option, setSelectedOption] = useState({
    name: 'Active',
    _id: 'active',
  });
  const tap_options = [
    { name: 'Active', _id: 'active' },
    { name: 'Suspended', _id: 'suspended' },
    { name: 'All', _id: 'all' },
  ];

  const projects = [
    {
      name: 'Hurudza',
      _id: 'hurudza',
      link: 'https://example.digiforge.app',
      createdAt: '2 days ago',
      branch: 'main',
      status: 'success'
    },
    {
      name: 'Daypitch',
      _id: 'daypitch',
      link: 'https://daypitch.com',
      createdAt: '2 days ago',
      branch: 'preview',
      status: 'failed'
    },
    {
      name: 'Hurudza',
      _id: 'asd232JK',
      link: 'https://example.com',
      createdAt: '2 days ago',
      branch: 'main',
      status: 'failed'
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-slate-50 py-16 min-h-screen">
        <div className="max-w-7xl w-full mx-auto px-4 md:space-y-16 space-y-8">
          {/* heading */}
          <OverviewHeading />
          {/* search and filter */}
          <div className="flex flex-row items-center space-x-4 w-full">
            <div className="flex flex-row items-center flex-1 bg-white main-border text-sm rounded-lg px-2 space-x-4">
              <MagnifyingGlassIcon
                height={20}
                width={20}
                className="text-slate-400"
              />
              <input
                type="text"
                className="border-none outline-none flex-1 py-2 text-slate-700"
                placeholder="search projects"
              />
            </div>
            <div className="md:flex hidden flex-row items-center text-sm  bg-white rounded-lg divide-x-[1px] divide-slate-200 main-border  ">
              {tap_options.map((item) => (
                <button
                  onClick={() => setSelectedOption(item)}
                  key={item._id}
                  className={`${
                    item._id === selected_option._id
                      ? 'text-primary-original '
                      : 'text-slate-700 '
                  } px-4 py-2`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          {/* project items */}
          <div className="grid grid-cols-3 gap-8">
            {projects.map((item) => (
              <ProjectItem
                link={item.link}
                key={item._id}
                name={item.name}
                createdAt={item.createdAt}
                branch={item.branch}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;

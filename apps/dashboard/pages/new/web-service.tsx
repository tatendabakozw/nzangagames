import PrimaryButton from '@components/buttons/PrimaryButton';
import PageHeading from '@components/page-heading/PageHeading';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@layouts/DashboardLayout';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const WebSerice = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl w-full mx-auto py-16 px-4 space-y-8">
        <PageHeading
          page="New"
          sub_text="Web Service"
          details="select a repository to create a new web service"
        />
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="col-span-1 p-4 border border-slate-200/50 rounded-lg space-y-4 bg-white">
            <p className="text-slaate-700 font-medium text-lg">
              Import a repository
            </p>
            <div className="border border-slate-200/50 rounded-lg w-full flex flex-row items-center space-x-2 px-2">
              <MagnifyingGlassIcon
                className="text-slate-500"
                height={20}
                width={20}
              />
              <input
                type="text"
                placeholder="search repository..."
                className="p-2 flex-1 outline-none text-slate-600"
              />
            </div>
            <div className="border border-slate-200/50 rounded-lg divide-y-[1px] divide-slate-200/50">
              {[...Array(4).fill(4)].map((item, index) => (
                <div key={index} className="flex flex-row p-3 items-center ">
                  <div className="flex space-x-4 flex-row flex-1">
                    <FaGithub />
                    <p className="text-sm font-medium">gidi-forge</p>
                  </div>
                  <PrimaryButton text='Connect' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WebSerice;

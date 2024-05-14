import GithubButton from '@components/buttons/GithubButton';
import PrimaryButton from '@components/buttons/PrimaryButton';
import PageHeading from '@components/page-heading/PageHeading';
import { Store } from '@context/Store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAuthFetch } from '@hooks/useAuthFetch';
import DashboardLayout from '@layouts/DashboardLayout';
import { apiUrl } from '@utils/apiUrl';
import { ContextType } from '@utils/types';
import React, { useContext, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const StaticSite = () => {
  const [isGithubConnected,] = useState(false);
  const { state } = useContext<ContextType>(Store);
  const { userInfo } = state;
  
  const githubAuthHandler = async () =>{
    window.location.href = 'http://localhost:3333/api/user/install-github';
  } 

  console.log('userInfo from login of user: ----- ', userInfo)

  const data = useAuthFetch(`${apiUrl}/api/user/repos`, userInfo?.token);

  console.log('data from login of user: ----- ', data)

  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl w-full mx-auto py-16 px-4 space-y-8">
          <PageHeading
            page="New"
            sub_text="Static site"
            details="you can use a github repository or import a local file"
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="col-span-1 p-4 main-border rounded-lg space-y-4 bg-white">
              <p className="text-slaate-700 font-medium text-lg">
                Import a repository
              </p>
              <div className="main-border rounded-lg w-full flex flex-row items-center space-x-2 px-2">
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
              {isGithubConnected ? (
                <div className="main-border rounded-lg main-divide-y">
                  {[...Array(4).fill(4)].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-3 items-center "
                    >
                      <div className="flex space-x-4 flex-row flex-1">
                        <FaGithub />
                        <p className="text-sm font-medium">gidi-forge</p>
                      </div>
                      <PrimaryButton text="Connect" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="main-border rounded-lg p-4 space-y-4 flex flex-col items-center">
                  <p className="text-center text-sm text-slate-900 font-medium capitalize">
                    Connect your github account
                  </p>
                  <GithubButton loading={false} onClick={githubAuthHandler} />
                </div>
              )}
            </div>

            <div className="col-span-1 p-4 main-border rounded-lg space-y-4 bg-white">
              <p className="text-slaate-700 font-medium text-lg">
                Import a local file
              </p>

              <div className="main-border rounded-lg main-divide-y">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaticSite;

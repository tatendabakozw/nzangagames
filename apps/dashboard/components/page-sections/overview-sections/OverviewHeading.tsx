import PageHeading from "@components/page-heading/PageHeading";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const OverviewHeading = () => {
  return (
    <div className="flex md:flex-row flex-col ">
      <PageHeading
        page="NzangaGames"
        sub_text="Dashboard"
        details="Traditional games teach us culture and customs to open the mind"
      />

      {/* <div className="flex flex-row items-center space-x-2 md:pt-0 pt-8">
        <Link href={"/new/static-site"} className="flex flex-col">
          <div className="flex flex-row items-center space-x-2 text-primary-original border border-primary-original p-2 rounded-lg">
            <PlusIcon height={16} width={15} />
            <p className="text-sm font-medium">Static Site</p>
          </div>
        </Link>
        <Link href={"/new/web-service"} className="flex flex-col">
          <div className="flex flex-row items-center space-x-2 text-white bg-primary-original p-2 rounded-lg">
            <PlusIcon height={16} width={15} />
            <p className="text-sm font-medium">Web Service</p>
          </div>
        </Link>
      </div> */}
    </div>
  );
};

export default OverviewHeading;

import { EllipsisHorizontalIcon, LinkIcon } from "@heroicons/react/24/outline";
import { projectItemProps } from "@utils/types";
import React from "react";

const ProjectItem = (props: projectItemProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* <div className="flex flex-row items-center space-x-2 pl-2">
        <LinkIcon height={16} width={16} />
        <p className="font-medium text-sm text-slate-900">{props.link}</p>
      </div> */}
      <div className="bg-white flex flex-row main-border gap-4 p-4 rounded-lg">
        <div className="flex-1 flex flex-row items-center space-x-4">
          <div className="avatar h-10 w-10 flex-shrink-0 rounded-full bg-primary-original grid items-center justify-center content-center main-border">
            {<props.Icon height={24} width={24} className={"text-white"} />}
          </div>
          <div className="flex flex-col">
            <p className="text-slate-900 font-semibold">{props.name}</p>
            <div className="flex flex-row items-center text-xs text-slate-500 space-x-1 font-medium">
              <p className="">{props.createdAt}</p>
              <p className="text-md">&bull;</p>
              <p
                className={
                  props.status === "failed"
                    ? "text-red-500 "
                    : "text-green-500 "
                }
              >
                {props.branch}
              </p>
            </div>
          </div>
        </div>
        <button>
          <EllipsisHorizontalIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;

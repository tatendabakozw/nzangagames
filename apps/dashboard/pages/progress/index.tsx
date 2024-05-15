import PageHeading from "@components/page-heading/PageHeading";
import DashboardLayout from "@layouts/DashboardLayout";
import React from "react";

type Props = {};

const Progress = (props: Props) => {
  return (
    <DashboardLayout>
      <div className="bg-secondary w-full min-h-[95vh]">
        <div className="flex py-16 px-4 mx-auto w-full max-w-7xl flex-col space-y-8">
          <PageHeading
            page="Progress"
            sub_text="Dashboard"
            details="Checkout how you and others have been doing."
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="col-span-1 bg-primary flex flex-col main-border gap-4 p-4 space-y-2 rounded-lg w-full">
              <div className="flex flex-col space-y-1">
                <p className=" font-semibold">Chii Ichi</p>
                <p className="text-zinc-400 text-xs font-medium">
                  Here is who has been playing better than you.
                </p>
              </div>
              <div className="grid grid-cols-3 text-sm font-semibold heading-text">
                <div className="col-span-1">Player</div>
                <div className="col-span-1">Position</div>
                <div className="col-span-1">PlayTime</div>
              </div>
              <div className="grid grid-cols-3 text-sm text-zinc-700s">
                <div className="col-span-1">Munashe</div>
                <div className="col-span-1">1</div>
                <div className="col-span-1">1 hr</div>
              </div>
            </div>
            <div className="col-span-1 bg-primary flex flex-col main-border gap-4 p-4 space-y-2 rounded-lg w-full">
              <div className="flex flex-col space-y-1">
                <p className=" font-semibold">Quiz</p>
                <p className="text-zinc-400 text-xs font-medium">
                  Here is who has been playing better than you.
                </p>
              </div>
              <div className="grid grid-cols-3 text-sm font-semibold heading-text">
                <div className="col-span-1">Player</div>
                <div className="col-span-1">Position</div>
                <div className="col-span-1">PlayTime</div>
              </div>
              <div className="grid grid-cols-3 text-sm text-zinc-700s">
                <div className="col-span-1">Bako</div>
                <div className="col-span-1">1</div>
                <div className="col-span-1">5 hr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;

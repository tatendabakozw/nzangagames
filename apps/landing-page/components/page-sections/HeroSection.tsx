import Link from "next/link";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/hero-section.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
      }}
      className={`flex w-full h-full min-h-[90vh] bg-no-repeat p-2 relative pt-20`}
    >
      <div className="overlay  absolute  top-0 right-0 left-0 bottom-0 bg-black z-0 opacity-40"></div>
      <div className="flex items-center flex-row w-full max-w-7xl mx-auto z-10">
        <div className="xl:max-w-3xl max-w-2xl mx-auto w-full ">
          <div className="  w-full my-auto flex text-white z-10 flex-col items-center ">
            <p className="xl:text-6xl text-4xl font-extrabold text-center ">
              Enjoy tradition with NzangaGames
            </p>
            <p className="text-gray-200 pt-4 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              alias tempore placeat modi quaerat necessitatibus veritatis
              minima, assumenda beatae dolore harum repellendus incidunt
              corporis libero quia recusandae error non voluptatem?
            </p>
            <div className="flex flex-row self-center items-center gap-5 pt-8">
              <Link
                href={"/contact"}
                className="flex px-6 py-2 bg-[#7d5c3e] text-white rounded-full font-semibold"
              >
                Details
              </Link>
              <Link
                href={"/contact"}
                className="flex px-6 py-2 bg-[#7d5c3e] text-white rounded-full font-semibold"
              >
                Play
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

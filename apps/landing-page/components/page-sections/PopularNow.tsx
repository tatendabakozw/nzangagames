import Image from "next/image";
import React from "react";

type Props = {};

const PopularNow = (props: Props) => {
  return (
    <div className="bg-zinc-900 ">
      <div className="max-w-7xl w-full mx-auto px-4 py-16 space-y-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-semibold text-white ">
            Popular <span className="text-primary-original">Now</span>{" "}
          </p>
          <p className="bg-primary-original text-sm text-white rounded-md px-3 py-2">
            VIEW ALL
          </p>
        </div>
        <div className="grid grid-cols-2 space-x-8 w-full">
          <div className="col-span-1 h-96 rounded-md relative">
            <Image
              src={"/images/quiz.jpg"}
              fill
              style={{ objectFit: "cover" }}
              alt="quiz game"
              className="object-cover rounded-md"
            />
          </div>
          <div className=" flex col-span-1 flex-col  space-y-4">
            <p className="text-primary-original text-sm font-medium">
              Genre:{" "}
              <span className="text-white">Single-player, knowledge, quiz</span>
            </p>
            <p className="text-xl font-semibold text-white">Mubvunzo</p>
            <p className="text-zinc-300 text-sm">
              "Mubvunzo" offers an immersive quiz experience that celebrates the
              vibrant tapestry of Zimbabwean culture. Through a diverse range of
              question categories spanning history, traditions, cuisine, music
              and arts, wildlife, language, and geography, players embark on an
              enriching exploration of Zimbabwe's rich heritage. From delving
              into significant historical events and leaders to exploring the
              intricacies of traditional ceremonies and rituals, each question
              serves as a gateway to a deeper understanding of Zimbabwean
              traditions. Interactive elements such as image-based questions,
              audio clips of traditional music, and video snippets of cultural
              celebrations enhance the immersive experience, while varying
              difficulty levels cater to players of all knowledge levels.
              Educational insights and informative explanations accompany each
              question, providing valuable context and fostering a deeper
              appreciation for Zimbabwean culture.
            </p>
            <p className=" font-medium text-primary-original text-xs">
              price:{" "}
              <span className="texxt-sm font-semibold text-white">FREE</span>
            </p>
            <div className="flex flex-row items-center">
              <div className="bg-primary-original uppercase text-white font-medium rounded-full px-6 py-2 cursor-pointer">
                Play Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularNow;

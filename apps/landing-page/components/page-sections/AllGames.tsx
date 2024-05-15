import React from "react";
import GameItem from "../game-item/GameItem";

type Props = {};

const AllGames = (props: Props) => {
  return (
    <div className="bg-zinc-900 py-16">
      <div className="max-w-7xl px-4 mx-auto w-full space-y-8 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-semibold text-white ">
            All <span className="text-primary-original">Games</span>{" "}
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-12">
          <GameItem
            name="Pada"
            image={"/images/pada.jpg"}
            genre="Multipayer-player, adventure, fun"
            description="Pada Echoes the classic hopscotch with joyful joping, jumoing and
        maneuvaring. Players navigate designated spaces or patterns with skill
        incoperating rules and challenges for edded excitement."
            price={"FREE"}
          />
          <GameItem
            name="Tsoro"
            image={"/images/tsoro.jpg"}
            genre="Single-player, knowledge, quiz"
            description="Tsoro presents a strategic board game deeply rooted in Zimbabwean tradition. Players strategize to outmaneuver opponents, aiming to capture stones and dominate the board. With its rich cultural significance and engaging gameplay, Tsoro offers an immersive gaming experience."
            price={"FREE"}
          />
          <GameItem
            image={"/images/quiz.jpg"}
            name="Mubvunzo"
            genre="Single-player, knowledge, quiz"
            description=" Mubvunzo offers a quiz experience centered on Zimbabwean culture,
            featuring questions that delve into its rich heritage. Players
            engange in an enriching exploration, testing their knowledge and
            understanding of zimbabwean traditions"
            price={"FREE"}
          />
          <GameItem
            name="Chii ichi"
            image={"/images/quiz.jpg"}
            genre="Single-player, knowledge, quiz"
            description="Chii ichi showcases Zimbabwean traditional tools through images. Players identofy tools by choosing the correct name from options provided, depening cultural appreciation with each correct answer."
            price={"FREE"}
          />
        </div>
      </div>
    </div>
  );
};

export default AllGames;

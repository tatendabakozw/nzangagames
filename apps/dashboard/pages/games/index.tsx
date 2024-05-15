import GameItem from "@components/game-item/GameItem";
import GamesSubNav from "@components/navigation/GamesSubNav";
import PageHeading from "@components/page-heading/PageHeading";
import DashboardLayout from "@layouts/DashboardLayout";
import { data } from "@utils/data";
import React from "react";

type Props = {};

const Games = (props: Props) => {
  return (
    <DashboardLayout>
      <div className="flex py-16 bg-secondary min-h-screen">
        <div className="max-w-7xl space-y-8 w-full mx-auto px-4 ">
          <div className="flex">
            <GamesSubNav />
          </div>
          <PageHeading
            page="All"
            sub_text="Games"
            details="A list of all available games to play"
          />
          <div className="grid grid-cols-4 gap-4">
            {data.games.map((item) => (
              <GameItem
                name={item.name}
                status={item.status}
                _id={item._id}
                image={item.image}
                genre={item.genre}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Games;

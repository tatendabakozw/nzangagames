import Image from "next/image";
import React from "react";

type Props = {
  image: any;
  genre: string;
  price: number | string;
  description: string;
  name: string;
};

const GameItem = (props: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="col-span-1 h-60 rounded-md relative">
        <Image
          src={props.image}
          fill
          style={{ objectFit: "cover" }}
          alt="quiz game"
          className="object-cover rounded-md"
        />
      </div>
      <p className="text-primary-original text-sm font-medium">
        Genre: <span className="text-white">{props.genre}</span>
      </p>
      <p className="text-lg font-semibold text-white">{props.name}</p>
      <p className="text-zinc-200 line-clamp-2 overflow-hidden text-sm truncate-2-lines">
        {props.description}
      </p>
      <p className=" font-medium text-primary-original text-sm">
        price: <span className=" font-semibold text-white">{props.price}</span>
      </p>
      <div className="flex flex-row items-center">
        <div className="bg-primary-original uppercase text-white font-medium rounded-full text-sm px-6 py-2 cursor-pointer">
          Play Now
        </div>
      </div>
    </div>
  );
};

export default GameItem;

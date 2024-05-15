import Image from "next/image";
import React from "react";
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  image: any;
  genre: string;
  price: number | string;
  description: string;
  name: string;
  status: string;
  _id: string;
};

const GameItem = (props: Props) => {
  return (
    <div className="flex flex-col bg-primary rounded-xl">
      <div className="col-span-1 h-40 rounded-t-xl relative">
        <Image
          src={props.image}
          fill
          style={{ objectFit: "cover" }}
          alt="quiz game"
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="flex flex-col space-y-2 p-4">
        <p className="text-lg font-semibold text-zinc-900">{props.name}</p>
        <p className="text-primary-original text-xs font-medium">
          Genre: <span className="text-zinc-700">{props.genre}</span>
        </p>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <div className="bg-primary-original text-white p-2 rounded-full">
              <PuzzlePieceIcon height={16} width={16} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-zinc-900 font-semibold">8 Players</p>
              <p
                className={`${
                  props.status === "available"
                    ? "text-green-500 "
                    : "text-zinc-400 "
                }text-xs`}
              >
                {props.status}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <Link
              href={`/games/${props._id}`}
              className="bg-secondary uppercase text-zinc-900 text-xs font-medium rounded-full py-1 px-2 cursor-pointer"
            >
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;

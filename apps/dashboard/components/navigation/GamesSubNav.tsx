/* eslint-disable @typescript-eslint/ban-types */
import { useRouter } from "next/router";

type Props = {};

const GamesSubNav = (props: Props) => {
  const router = useRouter();

  const { pathname } = router;
  const overview_options = [
    { name: "All Games", _id: "all-games", location: "/games" },
    { name: "History", _id: "history", location: "/history" },
  ];

  return (
    <div className="flex overflow-scroll no-scrollbar flex-row items-center bg-primary rounded-lg p-1">
      {overview_options.map((item, index) => (
        <button
          onClick={() => {
            router.push(`${item.location}`);
          }}
          key={index}
          className={`${
            pathname === item.location ? "bg-secondary font-semibold " : ""
          } py-2 outline-none px-4 rounded-lg main-link-text cursor-pointer text-sm font-medium `}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default GamesSubNav;

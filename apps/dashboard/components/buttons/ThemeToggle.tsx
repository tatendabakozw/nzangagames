/* eslint-disable @typescript-eslint/ban-types */
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

type Props = {};

const ThemeToggler = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        currentTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
      className=" transition-all cursor-pointer duration-100 main-link-text dark:hover:bg-slate-800 hover:bg-slate-100 p-1 rounded-full"
    >
      {currentTheme === "dark" ? (
        <SunIcon height={20} width={20} />
      ) : (
        <MoonIcon height={20} width={20} />
      )}
    </button>
  );
};

export default ThemeToggler;

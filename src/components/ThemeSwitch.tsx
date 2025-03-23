"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonStar, SunMedium } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="w-12 h-4" />;

  return (
    <div className="">
      {theme === "light" ? (
        <Button variant={"ghost"} onClick={() => setTheme("dark")}>
          <MoonStar size={18} />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          onClick={() => setTheme("light")}
          disabled={theme === "light"}
        >
          <SunMedium size={18} />
        </Button>
      )}
    </div>
  );
};

export default ThemeSwitch;

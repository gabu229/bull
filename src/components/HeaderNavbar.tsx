import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitch from "./ThemeSwitch";

const HeaderNavbar = () => {
  return (
    <header className="sticky top-0 z-10 px-2 md:px-8 xl:px-16 py-2 border-b bg-background/50 backdrop-blur-2xl">
      <nav className="container max-w-[1240px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            <Image
              src="/bull_logo.svg"
              alt="Bull Logo"
              width={400}
              height={400}
              className="w-16 h-auto"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search size={24} />
          </Button>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};

export default HeaderNavbar;

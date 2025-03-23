"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeTabLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentTab = pathname.split("/")[1] || "cryptocurrency";

  return (
    <section className="w-full mx-auto">
      <Tabs
        value={currentTab}
        className="w-full sticky top-16 py-5 z-30 hidden"
      >
        <TabsList className="flex justify-start gap-12">
          <TabsTrigger
            className="text-start text-sm sm:text-base rounded-none"
            value="cryptocurrency"
            asChild
          >
            <Link href="/cryptocurrencies">Cryptocurrency</Link>
          </TabsTrigger>
          <TabsTrigger
            className="text-start text-sm sm:text-base rounded-none"
            value="categories"
            asChild
          >
            <Link href="/categories">Categories</Link>
          </TabsTrigger>
          <TabsTrigger
            className="text-start text-sm sm:text-base rounded-none"
            value="nfts"
            asChild
          >
            <Link href="/nfts">NFTs</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="min-h-screen">{children}</div>
    </section>
  );
};

export default HomeTabLayout;

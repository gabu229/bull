import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import axios from "@/lib/axios";
import useSWR from "swr";
import { SectionSkeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";

interface CoinData {
  item: {
    id: string;
    small: string;
    name: string;
    data: {
      price: number;
      price_change_percentage_24h: { [key: string]: number };
      sparkline: string;
    };
  };
}
const currency = "usd";

export default function TrendingCoins() {
  const { theme } = useTheme()
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: coins,
    error,
    isLoading,
  } = useSWR("/search/trending", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  // const [coins, setCoins] = useState<CryptoCoin[]>([]);

  if (!coins || isLoading) return <SectionSkeleton />;
  if (error) return <div>Failed to load coin history</div>;

  return (
    <Marquee
      className=""
      loop={0}
      pauseOnHover
      gradient
      gradientColor={theme === "dark" ? "#141414" : "#efefef"}
      gradientWidth={125}
    >
      {coins.coins.slice(0, 8).map((coin: CoinData, i: number) => (
        <Link
          href={`/cryptocurrencies/${coin.item.id}`}
          key={i}
          className="block mx-3"
        >
          <Card className="relative min-w-[200px] md:min-w-[250px] bg-accent/5 dark:bg-primary/20 hover:bg-accent/20 dark:hover:bg-primary/25 text-foreground rounded-xl py-3 sm:py-5">
            <CardContent className="flex flex-col gap-0">
              <div className="w-full flex justify-between mb-2">
                <div className="w-8 aspect-square rounded-full overflow-hidden mb-3">
                  <Image
                    src={coin.item.small}
                    alt={coin.item.name}
                    width={200}
                    height={200}
                    className="w-full h-auto p-0 m-0"
                    loading="lazy"
                  />
                </div>
                <Image
                  src={coin.item.data.sparkline}
                  alt="Graph"
                  width={1000}
                  height={1000}
                  className="w-full h-auto aspect-[4/1] max-w-[100px]"
                />
              </div>

              <h3 className="text-sm">{coin.item.name}</h3>
              <div className="flex gap-2">
                <p className="text-base sm:text-2xl font-extrabold">
                  ${" "}
                  {coin.item.data.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="text-right text-sm flex justify-end items-center gap-0">
                  {coin.item.data.price_change_percentage_24h[currency] > 0 ? (
                    <ArrowBigUp className="text-success" size={18} />
                  ) : (
                    <ArrowBigDown className="text-destructive" size={18} />
                  )}
                  <p
                    className={cn(
                      coin.item.data.price_change_percentage_24h[currency] < 0
                        ? "text-destructive"
                        : "text-success"
                    )}
                  >
                    {Number(
                      coin.item.data.price_change_percentage_24h[currency]
                    ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
              <div className="hidden md:blocka">
                <Image
                  src={coin.item.data.sparkline}
                  alt="Graph"
                  width={1000}
                  height={1000}
                  className="w-full h-auto aspect-[4/1]"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Marquee>
  );
}

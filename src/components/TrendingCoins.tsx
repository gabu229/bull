import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import axios from "@/lib/axios";
import useSWR from "swr";
import { SectionSkeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {coins.coins.slice(0, 4).map((coin: CoinData, i: number) => (
        <Link href={`/cryptocurrencies/${coin.item.id}`} key={i}>
          <Card className="relative bg-accent/5 dark:bg-primary/20 hover:bg-accent/20 dark:hover:bg-primary/25 text-foreground rounded-xl py-3 sm:py-5">
            <CardContent className="flex flex-col gap-0">
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

              <h3 className="text-sm">{coin.item.name}</h3>
              <div className="flex gap-2">
                <p className="text-base sm:text-2xl font-extrabold">
                  ${" "}
                  {coin.item.data.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
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
              <div className="">
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
    </div>
  );
}

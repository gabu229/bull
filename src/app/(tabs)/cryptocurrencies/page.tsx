"use client";

import TrendingCoins from "@/components/TrendingCoins";
import { TableSkeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { CryptoCoin } from "@/types/Cryptocurrency";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: coins,
    error,
    isLoading,
  } = useSWR("/coins/markets?vs_currency=usd", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // const [coins, setCoins] = useState<CryptoCoin[]>([]);

  if (!coins || isLoading) return <TableSkeleton />;
  if (error) return <div>Failed to load coin history</div>;

  return (
    <>
      <section className="w-full pb-5">
        <h1 className="text-2xl font-bold mb-5 text-muted">Trending coins</h1>
        <TrendingCoins />
      </section>

      <section className="pt-5">
        <h1 className="text-2xl font-bold mt-5 text-muted">Top coins by MC</h1>
        <div className="w-full">
          <Table>
            <TableHeader className="pointer-events-none">
              <TableRow>
                <TableHead className="w-8 md:w-16">#</TableHead>
                <TableHead className="">Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">24H</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin: CryptoCoin, i: number) => (
                <TableRow
                  className="text-base md:text-lg cursor-pointer"
                  key={i}
                  onClick={() => router.push(`/cryptocurrencies/${coin.id}`)}
                >
                  <TableCell className="text-xs text-muted font-medium">
                    {i + 1}
                  </TableCell>
                  <TableCell className="flex gap-4 items-center">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={200}
                      height={200}
                      className="w-6 h-auto p-0 m-0"
                      loading="lazy"
                    />
                    <p className="">
                      <span className="hidden md:inline">{coin.name}</span>{" "}
                      <span className="md:hidden uppercase">{coin.symbol}</span>
                      <span className="hidden md:inline uppercase">
                        ({coin.symbol})
                      </span>
                    </p>
                  </TableCell>
                  <TableCell className="">
                    $
                    {coin.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    })}
                  </TableCell>
                  <TableCell className="text-right flex justify-end items-center gap-3">
                    <p
                      className={cn(
                        coin.price_change_percentage_24h < 0
                          ? "text-destructive"
                          : "text-success"
                      )}
                    >
                      {Number(coin.price_change_percentage_24h).toFixed(2)}%
                    </p>
                    {coin.price_change_percentage_24h > 0 ? (
                      <ChevronUp className="text-success" size={18} />
                    ) : (
                      <ChevronDown className="text-destructive" size={18} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}

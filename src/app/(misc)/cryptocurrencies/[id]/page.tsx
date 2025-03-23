"use client";

import CurrencyCalculator from "@/components/CurrencyCalculator";
import LinkButton from "@/components/LinkButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { CoinData } from "@/types/CoinInfo";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ChartCandlestick,
  ChevronDown,
  ChevronUp,
  Coins,
  ExternalLink,
  LucideLockKeyhole,
  MessageCircleMoreIcon,
  Slash,
  TrendingUpDownIcon,
} from "lucide-react";
import Image from "next/image";
import { use } from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import useSWR from "swr";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const supportedCurrencies: { [key: string]: string } = {
  usd: "$",
  eur: "€",
  gbp: "£",
  ngn: "₦",
  cad: "C$",
  aud: "A$",
  jpy: "¥",
  inr: "₹",
  chf: "CHF",
};

const CoinInfoPage = ({ params }: PageProps) => {
  const { id } = use<{ id: string }>(params);

  // const [currency, setCurrency] = useState("usd");
  const currency = "usd";

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: coin,
    error,
    isLoading,
  } = useSWR<CoinData>(`/coins/${id}`, fetcher, {
    revalidateOnFocus: false,
    refreshWhenOffline: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
    // refreshInterval: 1000 * 60 * 1,
  });

  if (!coin || isLoading) return <DashboardSkeleton />;
  if (error) return <div>Failed to load coin</div>;

  return (
    <>
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cryptocurrencies">
                Cryptocurrencies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <span className="hidden md:inline">{coin.name}</span>{" "}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="relative py-5 md:py-10 flex flex-col md:flex-row gap-5 md:gap-16 justify-between items-start">
        <div className="md:sticky md:top-24 w-full flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <div className="w-10 aspect-square rounded-full overflow-hidden">
              <Image
                src={coin.image.small}
                alt={coin.name}
                width={200}
                height={200}
                className="w-full h-auto p-0 m-0"
                loading="lazy"
              />
            </div>
            <h1 className="text-2xl font-light">
              <span className="hidden md:inline">{coin.name}</span>{" "}
              <span className="md:hidden uppercase">{coin.symbol}</span>
              <span className="hidden md:inline uppercase">
                ({coin.symbol})
              </span>
            </h1>
          </div>

          <div className="flex gap-4">
            <p className="text-4xl font-extrabold">
              ${" "}
              {coin.market_data.current_price[currency].toLocaleString(
                undefined,
                { minimumFractionDigits: 2, maximumFractionDigits: 8 }
              )}
            </p>
            <div className="text-right flex justify-end items-center gap-1">
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <ChevronUp className="text-success" size={18} />
              ) : (
                <ChevronDown className="text-destructive" size={18} />
              )}
              <p
                className={cn(
                  "text-lg",
                  coin.market_data.price_change_percentage_24h < 0
                    ? "text-destructive"
                    : "text-success"
                )}
              >
                {Number(coin.market_data.price_change_percentage_24h).toFixed(
                  2
                )}
                % (24H)
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="px-4 py-2 border border-muted/70 rounded-md flex flex-col *:text-xs md:*:text-sm">
              <div className="flex justify-around py-2 border-b border-muted/50 text-muted">
                <div className="">24H</div>
                <div className="">7D</div>
                <div className="">1M</div>
                <div className="">60D</div>
                <div className="">1Y</div>
              </div>
              <div className="flex justify-around py-2 opacity-80">
                <PriceChangePercentage
                  value={coin.market_data.price_change_percentage_24h}
                />
                <PriceChangePercentage
                  value={coin.market_data.price_change_percentage_7d}
                />
                <PriceChangePercentage
                  value={coin.market_data.price_change_percentage_30d}
                />
                <PriceChangePercentage
                  value={coin.market_data.price_change_percentage_60d}
                />
                <PriceChangePercentage
                  value={coin.market_data.price_change_percentage_1y}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-4">
            <CurrencyCalculator
              fromCurrency={coin.symbol}
              fromImage={coin.image.thumb}
              toCurrency={currency}
              supportedCurrencies={supportedCurrencies}
              conversionRates={coin.market_data.current_price}
            />
          </div>

          <div className="w-full flex flex-col gap-4 px-1">
            <div className="w-full py-3 flex justify-between border-b">
              <h2 className="">Market Cap</h2>
              <p className="">
                {supportedCurrencies[currency]}
                {coin.market_data.market_cap[currency].toLocaleString()}
              </p>
            </div>

            <div className="w-full py-3 flex justify-between border-b">
              <h2 className="">ATH</h2>
              <p className="">
                {supportedCurrencies[currency]}
                {coin.market_data.ath[currency].toLocaleString()}
              </p>
            </div>

            <div className="w-full py-3 flex justify-between border-b">
              <h2 className="">ATL</h2>
              <p className="">
                {supportedCurrencies[currency]}
                {coin.market_data.atl[currency].toLocaleString()}
              </p>
            </div>

            <div className="w-full py-3 flex justify-between border-b">
              <h2 className="">Total Supply</h2>
              <p className="">
                {coin.market_data.total_supply.toLocaleString()}
              </p>
            </div>

            <div className="w-full py-3 flex justify-between border-b">
              <h2 className="">Circulating Supply</h2>
              <p className="">
                {coin.market_data.circulating_supply.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full mx-auto">
          <Tabs defaultValue="chart" className="w-full py-5 z-30">
            <TabsList className="sticky top-24 py-5 flex justify-start gap-6 md:gap-12 mb-3 bg-background/70 backdrop-blur-md">
              <TabsTrigger
                className="text-start text-sm sm:text-base rounded-none pr-6 cursor-pointer gap-2"
                value="chart"
              >
                <ChartCandlestick size={20} />
                Chart
              </TabsTrigger>
              <TabsTrigger
                className="text-start text-sm sm:text-base rounded-none pr-6 cursor-pointer gap-2"
                value="market"
              >
                <TrendingUpDownIcon size={20} />
                Market
              </TabsTrigger>
              <TabsTrigger
                className="text-start text-sm sm:text-base rounded-none pr-6 cursor-pointer gap-2"
                value="about"
              >
                <Coins size={20} />
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <div className="relative w-full flex flex-col rounded-md overflow-hidden">
                <Image
                  src="/chart.png"
                  alt={coin.name}
                  width={500}
                  height={500}
                  className="w-full h-auto select-none"
                  loading="lazy"
                />
                <div className="w-full absolute h-full bg-background/70 backdrop-blur-xs flex flex-col text-center justify-center items-center">
                  <div className="flex items-center justify-center gap-0 mb-2">
                    <Image
                      src={coin.image.thumb}
                      alt={coin.name}
                      width={200}
                      height={200}
                      className="w-7 h-auto"
                      loading="lazy"
                    />
                    <LucideLockKeyhole className="w-7 -ml-2 mt-2" />
                  </div>
                  <p className="text-base w-full max-w-xs">
                    {coin.name} price chart is currently unavailable in your
                    region.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="market">Market</TabsContent>
            <TabsContent value="about">
              <div className="w-full flex flex-col">
                {coin?.description.en.split(".").map((desc, i) => (
                  <p key={i} className="text-base md:text-lg mb-4">
                    {desc}
                  </p>
                ))}
              </div>
              <div className="w-full flex gap-5 flex-wrap">
                {coin?.links.homepage.map((link, i) => (
                  <LinkButton key={i} href={link} target="_blank">
                    <Image
                      src={coin.image.thumb}
                      width={50}
                      height={50}
                      className="w-5 h-auto"
                      alt=""
                    />
                    <span className="">Visit Homepage</span>
                  </LinkButton>
                ))}

                {coin?.links.official_forum_url.map((link, i) => (
                  <LinkButton key={i} href={link} target="_blank">
                    <MessageCircleMoreIcon
                      className="text-foreground mr-1"
                      size={16}
                    />
                    <span className="">Visit Forum</span>
                  </LinkButton>
                ))}

                {coin?.links.whitepaper && (
                  <LinkButton href={coin?.links.whitepaper} target="_blank">
                    <ExternalLink className="text-foreground mr-1" size={16} />
                    <span className="">Whitepaper</span>
                  </LinkButton>
                )}

                {coin?.links.twitter_screen_name && (
                  <LinkButton
                    href={`https://x.com/${coin.links.twitter_screen_name}`}
                    target="_blank"
                  >
                    <FaXTwitter className="text-foreground mr-1" size={16} />
                    <span className="truncate">
                      @{coin.links.twitter_screen_name}
                    </span>
                  </LinkButton>
                )}

                {coin?.links.facebook_username && (
                  <LinkButton
                    href={`https://facebook.com/${coin.links.facebook_username}`}
                    target="_blank"
                  >
                    <FaFacebookF className="text-foreground mr-1" size={16} />
                    <span className="">@{coin.links.facebook_username}</span>
                  </LinkButton>
                )}

                {coin?.links.blockchain_site.slice(0, 2).map((link, i) => (
                  <LinkButton key={i} href={link} target="_blank">
                    <ExternalLink className="text-foreground mr-1" size={16} />
                    <span className="inline-block w-full line-clamp-1">
                      {link}
                    </span>
                  </LinkButton>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

const PriceChangePercentage = ({ value = 0.0 }: { value: number }) => {
  return (
    <div className="text-center flex justify-center items-center gap-0">
      {value >= 0 ? (
        <ChevronUp className="text-success" size={12} />
      ) : (
        <ChevronDown className="text-destructive" size={12} />
      )}
      <p className={cn("", value < 0 ? "text-destructive" : "text-success")}>
        {Math.abs(Number(value)).toFixed(2)}%
      </p>
    </div>
  );
};

export default CoinInfoPage;

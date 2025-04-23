"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronRight } from "lucide-react";

interface CurrencyCalculatorProps {
  fromCurrency: string;
  toCurrency: string;
  fromImage: string;
  supportedCurrencies: Record<string, string>;
  conversionRates: Record<string, number>;
}

const CurrencyCalculator = ({
  fromCurrency = "",
  fromImage = "",
  toCurrency = "usd",
  conversionRates = {},
  supportedCurrencies = {},
}: CurrencyCalculatorProps) => {
  const [fromAmount, setFromAmount] = useState("1.00");
  const [toAmount, setToAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(toCurrency);
  const [isFromAmountUpdated, setIsFromAmountUpdated] = useState(true);

  useEffect(() => {
    if (isFromAmountUpdated) {
      const rate = conversionRates[selectedCurrency];
      if (rate) {
        const convertedAmount = parseFloat(fromAmount) * rate || 0;
        setToAmount(convertedAmount.toFixed(5));
      }
    }
  }, [fromAmount, selectedCurrency, conversionRates, isFromAmountUpdated]);

  useEffect(() => {
    if (!isFromAmountUpdated) {
      const rate = conversionRates[selectedCurrency];
      if (rate) {
        const convertedAmount = parseFloat(toAmount) / rate || 0;
        setFromAmount(convertedAmount.toFixed(5));
      }
    }
  }, [toAmount, selectedCurrency, conversionRates, isFromAmountUpdated]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
    setIsFromAmountUpdated(true);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value);
    setIsFromAmountUpdated(false);
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setIsFromAmountUpdated(true);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-5 *:text-lg">
      <div className="w-full border border-muted/60 flex items-center justify-between gap-2 p-2 rounded-md">
        <Input
          type="number"
          placeholder="1.00"
          value={fromAmount}
          onChange={handleFromAmountChange}
          className="p-2 mr-2 border-0 !text-lg"
          min={0}
          step={0.01}
        />

        <div className="w-auto pl-1 pr-8 flex items-center bg-muted/5 rounded-md">
          <Image
            src={fromImage}
            alt={fromCurrency}
            width={200}
            height={200}
            className="w-20 h-auto p-0 m-0 mr-4"
            loading="lazy"
          />
          <p className="font-light">
            <span className="uppercase">{fromCurrency}</span>
          </p>
        </div>
      </div>

      <div className="bg-muted/10 rounded-full border border-muted/50 p-0.5 backdrop-blur-lg m-0 sm:-mx-4 md:-mx-0 lg:-mx-4 -my-5 md:-my-5 lg:-my-0 rotate-90 sm:rotate-0 md:rotate-90 lg:rotate-0">
        <ChevronRight className="text-muted" size={15} />
      </div>

      <div className="w-full border border-muted/60 flex items-center justify-between gap-2 p-2 rounded-md">
        <Input
          type="number"
          placeholder={conversionRates[selectedCurrency]?.toFixed(5)}
          value={toAmount}
          onChange={handleToAmountChange}
          className="w-full p-2 mr-2 border-0 !text-lg"
          min={0}
          step={0.01}
        />

        <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="border-0 bg-muted/5 text-lg">
            <SelectValue className="uppercase" placeholder="USD ($)" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(supportedCurrencies).map(([currency, symbol]) => (
              <SelectItem key={currency} value={currency} className="uppercase">
                {currency.toUpperCase()} ({symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CurrencyCalculator;

import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "@/providers/theme-provider";
import HeaderNavbar from "@/components/HeaderNavbar";

const font = Afacad({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bull - Real-time Cryptocurrency Prices",
  description:
    "Stay updated with the latest cryptocurrency prices, market cap, and trends. Track your favorite coins and get real-time data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <AppThemeProvider defaultTheme="dark">
          <HeaderNavbar />
          <main className="container w-full min-h-[60vh] px-2 md:px-8 max-w-[1240px] mx-auto mt-6">
            {children}
          </main>
        </AppThemeProvider>

        <div
          className="fixed inset-x-0 top-1/3 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80a opacity-80 rotate-180"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)]a aspect-[1155/678] w-[36.125rem]a w-full rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)]a sm:w-[72.1875rem]a"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </body>
    </html>
  );
}

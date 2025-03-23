"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";

interface AppThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export function AppThemeProvider({
  children,
  ...props
}: AppThemeProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" {...props}>
      {children}
    </ThemeProvider>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeName = "system" | "light" | "dark";
const STORAGE_KEY = "APP_THEME";

const dark = { background: "#000000", text: "#ffffff" };
const light = { background: "#ffffff", text: "#000000" };

type ThemeContextShape = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  colors: { background: string; text: string };
};

const ThemeContext = createContext<ThemeContextShape | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [theme, setThemeState] = useState<ThemeName>("system");

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemeState(stored as ThemeName);
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    AsyncStorage.setItem(STORAGE_KEY, t).catch(() => {});
  };

  const active = theme === "system" ? (system === "dark" ? "dark" : "light") : theme;
  const colors = active === "dark" ? dark : light;

  return <ThemeContext.Provider value={{ theme, setTheme, colors }}>{children}</ThemeContext.Provider>;
}
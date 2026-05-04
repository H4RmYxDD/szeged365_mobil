// filepath: /Users/harmi/szeged365_mobil/app/components/themed-text.tsx
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../app/providers/ThemeProvider";

type Props = TextProps & { type?: "title" | "link" | "default" };

export function ThemedText({ style, children, type = "default", ...rest }: Props) {
  const { colors } = useTheme();
  const base: TextStyle = { color: colors.text };
  const typeStyle: TextStyle = type === "title" ? { fontSize: 22, fontWeight: "700" } : type === "link" ? { color: "#007AFF" } : {};
  const merged = [base, typeStyle, style] as any;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Text style={merged} {...rest}>
      {children}
    </Text>
  );
}

export default ThemedText;
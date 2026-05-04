// filepath: /Users/harmi/szeged365_mobil/app/components/themed-view.tsx
import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../app/providers/ThemeProvider";

export function ThemedView({ style, children, ...rest }: ViewProps & { style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const merged = [{ backgroundColor: colors.background }, style] as any;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <View style={merged} {...rest}>
      {children}
    </View>
  );
}

export default ThemedView;
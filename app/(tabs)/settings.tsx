// filepath: [settings.tsx](http://_vscodecontentref_/1)
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "..//providers/ThemeProvider";

const Settings = () => {
  const { theme, setTheme, colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <ThemedText type="title" style={{ marginBottom: 8 }}>
        Beállítások
      </ThemedText>

      <ThemedText style={{ marginTop: 20, fontSize: 16, marginBottom: 8 }}>Alkalmazás téma:</ThemedText>

      <Picker
        selectedValue={theme}
        onValueChange={(v) => setTheme(v as any)}
        style={{ marginTop: 10, color: colors.text }}
        itemStyle={{ color: colors.text }}
        dropdownIconColor={colors.text}
      >
        <Picker.Item label="Rendszer alapú" value="system" color={colors.text} />
        <Picker.Item label="Világos" value="light" color={colors.text} />
        <Picker.Item label="Sötét" value="dark" color={colors.text} />
      </Picker>
    </SafeAreaView>
  );
};

export default Settings;
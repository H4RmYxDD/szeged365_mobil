// filepath: [settings.tsx](http://_vscodecontentref_/1)
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "..//providers/ThemeProvider";
const Settings = () => {
  const { theme, setTheme, colors } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 20, backgroundColor: colors.background }}
    >
      <ThemedText type="title" style={{ marginBottom: 8 }}>
        Beállítások
      </ThemedText>

      <ThemedText style={{ marginTop: 20, fontSize: 16, marginBottom: 8 }}>
        Alkalmazás téma:
      </ThemedText>

      <Picker
        selectedValue={theme}
        onValueChange={(v) => setTheme(v as any)}
        style={{ marginTop: 10, color: colors.text }}
        itemStyle={{ color: colors.text }}
        dropdownIconColor={colors.text}
      >
        <Picker.Item
          label="Rendszer alapú"
          value="system"
          color={colors.text}
        />
        <Picker.Item label="Világos" value="light" color={colors.text} />
        <Picker.Item label="Sötét" value="dark" color={colors.text} />
      </Picker>
      <ThemedText
        style={{ marginTop: 20, fontSize: 14, color: colors.text }}
        onPress={() => {
          router.push("https://szeged365.hu/impresszum/");
        }}
      >
        Impresszum
      </ThemedText>
      <ThemedText
        style={{ marginTop: 10, fontSize: 12, color: colors.text }}
        onPress={() => {
          router.push("https://szeged365.hu/adatvedelem/");
        }}
      >
        Adatvedelem
      </ThemedText>
      <ThemedText
        style={{ marginTop: 10, fontSize: 12, color: colors.text }}
        onPress={() => {
          router.push("https://szeged365.hu/jogvedelem/");
        }}
      >
        Jogvedelem
      </ThemedText>
      <ThemedText
        style={{ marginTop: 10, fontSize: 12, color: colors.text }}
        onPress={() => {
          router.push("https://szeged365.hu/mediaajanlat/");
        }}
      >
        Mediaajanlat
      </ThemedText>
      <Pressable
        onPress={() => {
          router.push("https://www.facebook.com/365szeged/");
        }}
      >
        <IconSymbol name={"youtube" as any} color={colors.text} />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("https://www.youtube.com/channel/UCBo-htugDlyYrGnZ5Mm_zKg");
        }}
      >
        <IconSymbol name={"instagram" as any} color={colors.text} />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("https://www.instagram.com/szeged_365/?hl=hu");
        }}
      >
        <IconSymbol name={"tiktok" as any} color={colors.text} />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("https://www.tiktok.com/@szeged365?lang=hu-HU");
        }}
      >
        <IconSymbol name={"facebook" as any} color={colors.text} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;

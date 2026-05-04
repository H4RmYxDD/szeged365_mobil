import { Image } from 'expo-image';
import { FlatList, Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  type CrewMember = {
    "id": number,
    "name": string,
    "url": string,
    "description": string,
    "link": string,
    "slug": string,
    "avatar_urls": {
      "24": string,
      "48": string,
      "96": string
    },
  };
  const [crew, setCrew] = React.useState<CrewMember[]>([]);

  React.useEffect(() => {
    fetch('https://szeged365.hu/wp-json/wp/v2/users?per_page=100')
      .then(response => response.json())
      .then(data => setCrew(data))
      .catch(error => console.error('Error fetching crew data:', error));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ThemedText>Szeged 365 crew</ThemedText>
    <FlatList
      data={crew}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Image
            source={{ uri: 'https://szeged365.hu/wp-content/plugins/wp-user-avatar/images/wpua-32x32.png' }}
            style={{ width: 48, height: 48, borderRadius: 24, marginRight: 10 }}
          />
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <ThemedText>{item.name}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    />
      
  </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

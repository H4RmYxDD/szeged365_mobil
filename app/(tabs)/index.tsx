// app/(tabs)/index.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { api } from "../../src/services/api";

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

const HomeScreen = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setError(null);
      const data = await api.getPosts(1, 15);
      setPosts(data);
    } catch (err: any) {
      console.error(err);
      setError("Nem sikerült betölteni a híreket. Próbáld meg később.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts();
  }, []);

  const getFeaturedImage = (post: Post) => {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Hírek betöltése...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPosts}>
          <Text style={styles.retryText}>Újra próbálkozás</Text>
        </TouchableOpacity>
      </View>
    );
  }

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Szeged365 Hírek</Text>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const imageUrl = getFeaturedImage(item);

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "/article/[id]",
                    params: { id: item.id.toString() },
                  })
                }
              >
                {imageUrl && (
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                )}

                <View style={styles.content}>
                  <Text style={styles.title} numberOfLines={3}>
                    {item.title.rendered}
                  </Text>

                  <Text style={styles.excerpt} numberOfLines={3}>
                    {item.excerpt.rendered.replace(/<[^>]+>/g, "")}
                  </Text>

                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  header: {
  fontSize: 28,
  fontWeight: "800",
  paddingHorizontal: 18,
  paddingTop: 22,     // ← EZT NÖVELTEM
  paddingBottom: 12,
  backgroundColor: "#fff",
},
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 18,
    overflow: "hidden",

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 230,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1c1c1e",
  },
  excerpt: {
    fontSize: 15,
    color: "#6e6e73",
    marginBottom: 12,
    lineHeight: 22,
  },
  date: {
    fontSize: 13,
    color: "#8e8e93",
    fontWeight: "500",
  },

  // Loading + error
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default HomeScreen;
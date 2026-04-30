// app/article/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../src/services/api';

const ArticleScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Hiányzik a cikk azonosítója");
      setLoading(false);
      return;
    }

    const loadArticle = async () => {
      try {
        console.log("Cikk betöltése, ID:", id); // ← debug
        const data = await api.getPost(parseInt(id));
        console.log("Betöltött cikk:", data);   // ← debug
        setPost(data);
      } catch (err: any) {
        console.error("Hiba a cikk betöltésekor:", err);
        setError("Nem sikerült betölteni a cikket. Próbáld meg később.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Cikk betöltése...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Cikk nem található"}</Text>
      </View>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <ScrollView style={styles.container}>
      {featuredImage && (
        <Image 
          source={{ uri: featuredImage }} 
          style={styles.image} 
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{post.title?.rendered || "Nincs cím"}</Text>
        
        <Text style={styles.date}>
          {new Date(post.date).toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <Text style={styles.contentText}>
          {post.content?.rendered 
            ? post.content.rendered.replace(/<[^>]+>/g, ' ').trim()
            : "Nincs elérhető tartalom ehhez a cikkhez."}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    lineHeight: 32, 
    marginBottom: 12 
  },
  date: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 20 
  },
  contentText: { 
    fontSize: 16, 
    lineHeight: 24, 
    color: '#333' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: { marginTop: 12, fontSize: 16 },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center' },
});

export default ArticleScreen;
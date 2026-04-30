const baseUrl = 'https://szeged365.hu/wp-json/wp/v2'

export const api = {
  getPosts: async (page = 1, perPage = 10, category?: number) => {
    let url = `${baseUrl}/posts?page=${page}&per_page=${perPage}&_embed`;
    
    if (category) {
      url += `&categories=${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Hiba a cikkek betöltésekor');
    return response.json();
  },

  getPost: async (id: number) => {
    const response = await fetch(`${baseUrl}/posts/${id}?_embed`);
    if (!response.ok) throw new Error('Hiba a cikk betöltésekor');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${baseUrl}/categories`);
    return response.json();
  }
};

export default api;
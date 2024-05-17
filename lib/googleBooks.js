const GOOGLE_BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

/**
 * Fetch books from Google Books API
 * @param {string} query - The search query
 * @param {string} type - The type of search (title or author)
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<object>} - The API response as a JSON object
 */
export async function fetchBooks(query, type, maxResults = 10) {
  let url = `${GOOGLE_BOOKS_API_BASE_URL}?q=${encodeURIComponent(query)}`;
  if (type === 'author') {
    url += `+inauthor:${encodeURIComponent(query)}`;
  }
  url += `&maxResults=${maxResults}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

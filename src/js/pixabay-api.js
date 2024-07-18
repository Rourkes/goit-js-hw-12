import axios from 'axios';

const API_KEY = '44984480-6400f6ac5e39d78263c6545e0';

const URL = 'https://pixabay.com/api/';

async function fetchImages(query, page) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export { fetchImages };

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31992866-998dd1f42fd3c68daf34fb5ba';

export async function fetchImage(query, page) {
  const { data } = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`
  );

  return data;
}

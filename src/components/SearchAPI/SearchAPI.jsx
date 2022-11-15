import axios from 'axios';

const API_KEY = '29957887-029d3d055d44cfd1872980aa9';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  orientation: 'horizontal',
  image_type: 'photo',
  per_page: 12,
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};

export default fetchImages;

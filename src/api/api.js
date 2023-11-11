import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const config = {
  params: {
    key: '39743312-4508a0e311c8ff0ec9a823a0a',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

export async function searchImages(query, page = 1) {
  try {
    const urlAXIOS = `?page=${page}&q=${query}`;
    const { data } = await axios.get(urlAXIOS, config);
    return data;
  } catch (error) {
    console.log(error);
  }
}
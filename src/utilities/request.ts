import axios from 'axios';

async function get(url: string) {
  const result = await axios.get(url);
  return result;
}

export const request = {
  get,
};

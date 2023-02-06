import { AxiosResponse } from 'axios';
import { request } from './request';

const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

async function getPokemon(id: number): Promise<AxiosResponse> {
  const result = await request.get(`${API_ENDPOINT}pokemon/${id}`);

  return result;
}

export { getPokemon };

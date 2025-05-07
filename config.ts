export const envConfig = {
  baseURL: import.meta.env.VITE_API_URL ?? 'https://swapi.tech/api',
  baseImageURL: import.meta.env.VITE_IMAGES_URL ?? 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api'
};

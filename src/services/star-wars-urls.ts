import { envConfig } from "../../config";

const { baseURL, baseImageURL } = envConfig;
const peopleURL = `${baseURL}/people`;
const filmsURL = `${baseURL}/films`;
const shipsURL = `${baseURL}/starships`;
const vehiclesURL = `${baseURL}/vehicles`;

export const STAR_WARS_URLS = {
	getPeople: peopleURL,
	getAvatar: (id: string) => `${baseImageURL}/id/${id}.json`,
	getPerson: (id: string) => `${peopleURL}/${id}`,
};
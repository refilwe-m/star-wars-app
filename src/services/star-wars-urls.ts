import { envConfig } from "../../config";

const { baseURL } = envConfig;
const peopleURL = `${baseURL}/people`;

export const STAR_WARS_URLS = {
	getPeople: peopleURL,
	getPerson: (id: string) => `${peopleURL}/${id}`,
};

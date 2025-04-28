import { envConfig } from "../../config";

const { baseURL } = envConfig;

export const STAR_WARS_URLS = {
	getPeople: `${baseURL}/people`,
	getPerson: (id: number) => `${baseURL}/people/${id}`,
};

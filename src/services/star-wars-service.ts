import axios from "axios";

import { STAR_WARS_URLS } from "./star-wars-urls";

const getCharacters = (search: string) => {
	return axios
		.get(STAR_WARS_URLS.getPeople, {
			params: { name: search },
		})
		.then((res) => res.data);
};

const getCharacter = (id: string) => {
	return axios.get(STAR_WARS_URLS.getPerson(id)).then((res) => res.data);
};

export default {
	getCharacter,
	getCharacters,
};

import axios from "axios";

import { STAR_WARS_URLS } from "./star-wars-urls";

const getCharacters = () => {
	return axios.get(STAR_WARS_URLS.getPeople).then((res) => res.data);
};

const getCharacter = (id: number) => {
	return axios.get(STAR_WARS_URLS.getPerson(id)).then((res) => res.data);
};

export default {
	getCharacter,
	getCharacters,
};

import { useQuery } from "@tanstack/react-query";

import { StarWarsService } from "@/services";
import type { CharacterAPI } from "@/services/types";
import map from "lodash/map";

export const useGetStarWarsCharacters = (search: string) => {
	return useQuery({
		queryKey: ["people"],
		queryFn: () => StarWarsService.getCharacters(search),
		select: (data) => {
			return map(data.result, ({ properties, uid }) => ({
				uid,
				...properties,
			})) as CharacterAPI[];
		},
		enabled: !!search,
	});
};

export const useGetStarWarsCharacter = (id: string) => {
	return useQuery({
		queryKey: ["person"],
		queryFn: () => StarWarsService.getCharacter(id),
		enabled: !!id,
		select: ({ result }) => ({ ...result?.properties, uid: result?.uid }),
	});
};

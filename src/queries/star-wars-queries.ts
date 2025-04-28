import { useQuery } from "@tanstack/react-query";
import map from "lodash/map";

import { StarWarsService } from "@/services";

export const useGetStarWarsCharacters = () => {
	return useQuery({
		queryKey: ["people"],
		queryFn: StarWarsService.getCharacters,
		select: (data) => map(data, ({ name, gender }) => ({ name, gender })),
	});
};

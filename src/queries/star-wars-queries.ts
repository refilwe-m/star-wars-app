import { useQuery } from "@tanstack/react-query";
import map from "lodash/map";

import { StarWarsService } from "@/services";

export const useGetStarWarsCharacters = (search: string) => {
  return useQuery({
    queryKey: ["people", search],
    queryFn: () => StarWarsService.getCharacters(search),
    select: (data) =>
      map(data.result, ({ uid, properties }) => ({
        id: uid,
        name: properties?.name ?? "-",
      })),
    enabled: !!search,
  });
};

export const useGetStarWarsCharacter = (id: string) => {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => StarWarsService.getCharacter(id),
    enabled: !!id,
    select: ({ result }) => ({ ...result?.properties, uid: result?.uid }),
  });
};

export const useGetStarWarsCharacterImage = (uid: string) => {
  return useQuery({
    queryKey: ["avatar", uid],
    queryFn: () => StarWarsService.getAvatar(uid),
    select: (res) => ({
      imageUrl: res.image,
    }),
    enabled: !!uid,
  });
};

import { useMemo } from "react";

import { compareCharacters } from "@/helper";
import type { CharacterAPI } from "@/services/types";

export const useWinner = (
  character1: CharacterAPI,
  character2: CharacterAPI
) => {
  const { winner } = useMemo(() => {
    if (character1 && character2) {
      return compareCharacters(character1, character2);
    }
    return {
      winner: "",
      attributes: [],
    };
  }, [character1, character2]);

  return {
    winner,
  };
};

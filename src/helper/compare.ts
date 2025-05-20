import type { CharacterAPI } from "@/services/types";

export const compareCharacters = (char1: CharacterAPI, char2: CharacterAPI) => {
  const attributes: Array<"height" | "mass" | "birth_year"> = ["height", "mass", "birth_year"];
  const wins =  attributes.map((attr) => ({
    attribute: attr,
    winner: char1[attr] > char2[attr] ? char1.name : char2.name,
    values: { [char1.name]: char1[attr], [char2.name]: char2[attr] },
  }));

    const winner = wins.reduce((acc, curr) => {
        if (curr.winner === char1.name) {
        acc[char1.name] = (acc[char1.name] || 0) + 1;
        } else {
        acc[char2.name] = (acc[char2.name] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);
    const winnerName = Object.keys(winner).reduce((a, b) => (winner[a] > winner[b] ? a : b));


    return { winner:winnerName, attributes: wins };
};
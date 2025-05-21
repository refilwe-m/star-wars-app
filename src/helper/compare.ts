import type { CharacterAPI } from "@/services/types";

/**
 * Compares two Star Wars characters based on specified attributes
 * @param char1 - First character to compare
 * @param char2 - Second character to compare
 * @returns Object containing the winner and comparison details
 */

export const compareCharacters = (char1: CharacterAPI, char2: CharacterAPI) => {
  const attributes: Array<"height" | "mass" | "birth_year"> = [
    "height",
    "mass",
    "birth_year",
  ];

  const wins = attributes.map((attr) => {
    const val1 = char1[attr] as string;
    const val2 = char2[attr] as string;

    if (attr === "birth_year") {
      const num1 = Number.parseInt(val1.replace("BBY", "")) || 0;
      const num2 = Number.parseInt(val2.replace("BBY", "")) || 0;
      return {
        attribute: attr,
        winner: num1 > num2 ? char1.name : char2.name,
        values: { [char1.name]: val1, [char2.name]: val2 },
      };
    }

    const num1 = Number.parseInt(val1) || 0;
    const num2 = Number.parseInt(val2) || 0;
    return {
      attribute: attr,
      winner: num1 > num2 ? char1.name : char2.name,
      values: { [char1.name]: val1, [char2.name]: val2 },
    };
  });

  const winner = wins.reduce(
    (acc, curr) => {
      if (curr.winner === char1.name) {
        acc[char1.name] = (acc[char1.name] || 0) + 1;
      } else {
        acc[char2.name] = (acc[char2.name] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const winnerName = Object.keys(winner).reduce((a, b) =>
    winner[a] > winner[b] ? a : b
  );

  return { winner: winnerName, details: wins };
};

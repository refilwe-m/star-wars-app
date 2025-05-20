import type { CharacterAPI } from "@/services/types";

export const compareCharacters = (char1: CharacterAPI, char2: CharacterAPI) => {
  const attributes: Array<"height" | "mass" | "birth_year"> = [
    "height",
    "mass",
    "birth_year",
  ];

  const wins = attributes.map((attr) => {
    const val1 = char1[attr];
    const val2 = char2[attr];

    // Handle birth_year (extract BBY number and invert comparison)
    if (attr === "birth_year") {
      const num1 = parseInt(val1.replace("BBY", "")) || 0;
      const num2 = parseInt(val2.replace("BBY", "")) || 0;
      return {
        attribute: attr,
        winner: num1 > num2 ? char1.name : char2.name, // Older = higher BBY
        values: { [char1.name]: val1, [char2.name]: val2 },
      };
    }

    // Handle height/mass (convert to number, default to 0 if invalid)
    const num1 = parseInt(val1) || 0;
    const num2 = parseInt(val2) || 0;
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

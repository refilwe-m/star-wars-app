import { expect, test } from "vitest";

import { compareCharacters } from "@/helper";

const YODA = {
  name: "Yoda",
  gender: "male",
  skin_color: "green",
  hair_color: "white",
  height: 66,
  eye_color: "brown",
  mass: 17,
  birth_year: "896BBY",
  url: "https://www.swapi.tech/api/people/20",
  uid: "20",
  language: "Huttese",
};
const DEXTER = {
  uid: "71",
  name: "Dexter Jettster",
  gender: "male",
  skin_color: "brown",
  hair_color: "none",
  height: 198,
  eye_color: "yellow",
  mass: 102,
  birth_year: "unknown",
  url: "https://www.swapi.tech/api/people/71",
  language: "Huttese",
};

const ANAKIN = {
  name: "Anakin Skywalker",
  gender: "male",
  skin_color: "fair",
  hair_color: "blond",
  height: 188,
  eye_color: "blue",
  mass: 84,
  birth_year: "41.9BBY",
  url: "https://www.swapi.tech/api/people/11",
  language: "Huttese",
  uid: "11",
};

const characters = [YODA, DEXTER, ANAKIN];
const compare = compareCharacters(characters[2], characters[1]);
const compare2 = compareCharacters(characters[0], characters[1]);
test("compares Yoda against Dexter and expects Dexter to Win", () => {
  const { winner } = compare2;
  expect({ winner }).toEqual({
    winner: "Dexter Jettster",
  });
});
test("compares Anakin against Dexter and expects Dexter to Win", () => {
  const { winner } = compare;
  expect({ winner }).toEqual({
    winner: "Dexter Jettster",
  });
});

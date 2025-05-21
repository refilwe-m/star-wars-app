import { compareCharacters } from "@/helper";
import { describe, expect, test } from "vitest";

const TEST_CHARACTERS = {
  YODA: {
    name: "Yoda",
    height: 66,
    mass: 17,
    birth_year: "896BBY",
    uid: "20",
    url: "https://swapi.tech/api/people/20/",
    hair_color: "white",
    skin_color: "green",
    eye_color: "brown",
    gender: "male",
  },
  DEXTER: {
    name: "Dexter Jettster",
    height: 198,
    mass: 102,
    birth_year: "unknown",
    uid: "71",
    url: "https://swapi.tech/api/people/71/",
    hair_color: "none",
    skin_color: "brown",
    eye_color: "yellow",
    gender: "male",
  },
  ANAKIN: {
    name: "Anakin Skywalker",
    height: 188,
    mass: 84,
    birth_year: "41BBY",
    uid: "11",
    url: "https://swapi.tech/api/people/11/",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    gender: "male",
  },
  CHEWBACCA: {
    name: "Chewbacca",
    height: 228,
    mass: "unknown",
    birth_year: "200BBY",
    uid: "13",
    url: "https://swapi.tech/api/people/13/",
    hair_color: "brown",
    skin_color: "unknown",
    eye_color: "blue",
    gender: "male",
  },
  R2D2: {
    name: "R2-D2",
    height: 96,
    mass: 32,
    birth_year: "33BBY",
    uid: "3",
    url: "https://swapi.tech/api/people/3/",
    hair_color: "none",
    skin_color: "white, blue",
    eye_color: "red",
    gender: "n/a",
  },
};

describe("compareCharacters", () => {
  describe("Basic Comparisons", () => {
    test("Dexter should beat Yoda (height + mass > birth_year)", () => {
      const { winner } = compareCharacters(
        TEST_CHARACTERS.YODA,
        TEST_CHARACTERS.DEXTER
      );
      expect(winner).toBe("Dexter Jettster");
    });

    test("Dexter should beat Anakin (height + mass > birth_year)", () => {
      const { winner } = compareCharacters(
        TEST_CHARACTERS.ANAKIN,
        TEST_CHARACTERS.DEXTER
      );
      expect(winner).toBe("Dexter Jettster");
    });
  });

  describe("Edge Cases", () => {
    test("Should handle unknown mass values (treat as 0)", () => {
      const { winner } = compareCharacters(
        TEST_CHARACTERS.YODA,
        TEST_CHARACTERS.CHEWBACCA
      );
      expect(winner).toBe("Yoda");
    });

    test("Should handle unknown birth_year (treat as 0BBY)", () => {
      const { winner } = compareCharacters(
        TEST_CHARACTERS.DEXTER,
        TEST_CHARACTERS.R2D2
      );
      expect(winner).toBe("Dexter Jettster");
    });

    test("Should handle equal attributes", () => {
      const clone = { ...TEST_CHARACTERS.YODA, name: "Yoda Clone" };
      const { winner } = compareCharacters(TEST_CHARACTERS.YODA, clone);
      expect([TEST_CHARACTERS.YODA.name, clone.name]).toContain(winner);
    });
  });

  describe("Attribute-specific Comparisons", () => {
    test("Height comparison should work correctly", () => {
      const result = compareCharacters(
        TEST_CHARACTERS.YODA,
        TEST_CHARACTERS.ANAKIN
      );
      expect(result.winner).toBe("Anakin Skywalker");
    });

    test("Mass comparison should work correctly", () => {
      const result = compareCharacters(
        TEST_CHARACTERS.YODA,
        TEST_CHARACTERS.R2D2
      );
      expect(result.winner).toBe("R2-D2");
    });

    test("Birth year comparison should work correctly (higher BBY = older)", () => {
      const result = compareCharacters(
        TEST_CHARACTERS.YODA,
        TEST_CHARACTERS.ANAKIN
      );
      expect(result.winner).toBe("Anakin Skywalker");
    });
  });
});

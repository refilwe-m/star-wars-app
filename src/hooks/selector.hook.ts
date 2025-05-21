import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Option } from "@/components/atoms";

export const useCharacterSelecor = () => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [characters, setCharacters] = useState<Option[]>([]);

  const onCharacterSelection = () => {
    if (selected) {
      const isAlreadySelected = characters.some(({ id }) => id === selected.id);
      if (isAlreadySelected) {
        toast.error("Character Already selected", {
          icon: "🤖",
        });
        setSelected(null);
        return;
      }
      if (characters.length >= 2) {
        toast.error("You can only compare 2 characters", {
          icon: "🤖",
        });
        setSelected(null);
        return;
      }

      setCharacters((prev) => [...prev, selected]);
      setSelected(null);
    }
  };

  const onDeselect = (_id: string) => {
    setCharacters(characters.filter(({ id }) => id !== _id));
  };

  useEffect(() => {
    onCharacterSelection();
  }, [selected]);

  return { selected, characters, setSelected, setCharacters, onDeselect };
};

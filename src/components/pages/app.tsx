import { useMemo } from "react";
import { Toaster } from "react-hot-toast";

import { useCharacterSelecor } from "@/hooks";
import { Logo } from "../atoms";
import { CharacterSelection } from "../molecules";
import { CharacterComparison } from "../organisms";
import { CenteredColumn } from "../templates";

export const App = () => {
	const { characters, setCharacters, selected, setSelected, onDeselect } =
		useCharacterSelecor();

	const placeholder = useMemo(() => {
		const placeholderText = "";

		switch (characters.length) {
			case 0:
				return "Select Character";
			case 1:
				return "Select Second Character";
			default:
				return placeholderText;
		}
	}, [characters]);

	return (
		<main className="w-full min-h-screen text-center bg-center bg-[url(/src/assets/images/background.jpg)] bg-cover p-4">
			<CenteredColumn>
				<Logo />
				<CharacterSelection
					setCharacters={setCharacters}
					setSelected={setSelected}
					placeholder={placeholder}
					selected={selected}
				/>
				<CharacterComparison characters={characters} onDeselect={onDeselect} />
			</CenteredColumn>
			<Toaster />
		</main>
	);
};

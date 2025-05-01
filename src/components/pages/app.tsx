import { useGetStarWarsCharacter, useGetStarWarsCharacters } from "@/queries";
import type { CharacterAPI } from "@/services/types";
import map from "lodash/map";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { ComboBox, type Option } from "../atoms";
import { Card } from "../molecules";

export const App = () => {
	const [compare, setCompare] = useState<Option[]>([]);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<Option | null>(null);
	const [debouncedSearch] = useDebounce(search, 500);
	const { data, isLoading } = useGetStarWarsCharacters(debouncedSearch);
	const { data: characterData, isLoading: characterLoading } =
		useGetStarWarsCharacter(selected?.id ?? "");
	// Separate states for each character
	const [character1, setCharacter1] = useState<CharacterAPI | null>(null);
	const [character2, setCharacter2] = useState<CharacterAPI | null>(null);
	console.log("#1", character1);
	console.log("#2", character1);
	const dataOptions = useMemo(
		() =>
			map(data, ({ uid, name }) => ({
				id: uid,
				name,
			})),
		[data],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!selected) return;
		if (compare.some((item) => item.id === selected.id)) return;
		const addCharacter = (position: number) => {
			console.log(position, characterData);
			if (characterData?.uid) {
				if (position === 0) setCharacter1(characterData);
				if (position === 1) setCharacter2(characterData);
			}
		};
		if (compare.length === 0) {
			setCompare([selected]);
			addCharacter(0);
		} else if (compare.length === 1) {
			setCompare([compare[0], selected]);
			addCharacter(1);
		}

		//setSelected(null);
		setSearch("");
	}, [selected, characterData]);

	const removeCharacter = (position: number) => {
		if (position === 0) {
			setCharacter1(null);
			setCompare((prev) => prev.filter((_, i) => i !== 0));
		} else {
			setCharacter2(null);
			setCompare((prev) => prev.filter((_, i) => i !== 1));
		}
	};

	return (
		<main className="w-full h-screen text-center bg-center bg-[url('../assets/images/background.jpg')]">
			<ComboBox
				value={selected}
				onChange={setSelected}
				options={dataOptions}
				query={search}
				setQuery={setSearch}
				loading={isLoading}
			/>
			{isLoading && !data ? (
				<>isLoading...</>
			) : (
				<section className="flex items-center gap-3">
					{character1?.uid && (
						<Card
							character={character1}
							isLoading={characterLoading}
							onClose={() => removeCharacter(0)}
						/>
					)}
					{character2?.uid && (
						<>
							<p>V.S</p>
							<Card
								character={character2}
								isLoading={characterLoading}
								onClose={() => removeCharacter(1)}
							/>
						</>
					)}
				</section>
			)}
		</main>
	);
};

import { Logo } from "@/assets";
import { useGetStarWarsCharacter, useGetStarWarsCharacters } from "@/queries";
import { useEffect, useMemo, useState } from "react";
import { ComboBox, type Option } from "../atoms";
import { Card } from "../molecules";

export const App = () => {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Option | null>(null);
	const [characters, setCharacters] = useState<Option[]>([]);
	const { data: searchData } = useGetStarWarsCharacters(query);
	const { data: character1, isLoading: loadingFirstCharacter } =
		useGetStarWarsCharacter(characters?.[0]?.id);
	const { data: character2, isLoading: loadingSecondCharacter } =
		useGetStarWarsCharacter(characters?.[1]?.id);
	const hasChar1Info = useMemo(
		() => character1 && !loadingFirstCharacter,
		[character1, loadingSecondCharacter],
	);
	const hasChar2Info = useMemo(
		() => character2 && !loadingSecondCharacter,
		[character2, loadingSecondCharacter],
	);

	const onCharacterSelection = () => {
		if (selected) setCharacters((prev) => [...prev, selected]);
	};

	const onRemoveCharacter = (_id: string) => {
		setCharacters(characters.filter(({ id }) => id !== _id));
	};
	console.log("Characters", characters, character1);

	useEffect(() => {
		onCharacterSelection();
	}, [selected]);

	return (
		<main className="w-full min-h-screen text-center bg-center bg-[url(/src/assets/images/background.jpg)] bg-cover p-4">
			<header className="flex flex-col items-center">
				<img src={Logo} alt="logo" className="w-md" />
				<h1 className="text-4xl font-bold text-amber-500 mb-8">
					Character Comparison
				</h1>
				<section>
					<ComboBox
						value={selected}
						onChange={setSelected}
						options={searchData ?? []}
						setQuery={setQuery}
					/>
				</section>
				<section id="comparison-area" className="flex gap-2 items-center py-3">
					{hasChar1Info && (
						<Card
							isLoading={loadingFirstCharacter}
							character={character1}
							onClose={() => onRemoveCharacter(character1?.uid)}
						/>
					)}
					{hasChar2Info && (
						<Card
							isLoading={loadingSecondCharacter}
							character={character2}
							onClose={() => onRemoveCharacter(character2?.uid)}
						/>
					)}
				</section>
			</header>
		</main>
	);
};

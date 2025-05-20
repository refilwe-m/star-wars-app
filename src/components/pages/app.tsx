import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Logo } from "@/assets";
import { useGetStarWarsCharacter, useGetStarWarsCharacterImage, useGetStarWarsCharacters } from "@/queries";
import { STAR_WARS_URLS } from "@/services/star-wars-urls";
import { ComboBox, RobotAnimation, type Option } from "../atoms";
import { Card } from "../molecules";

export const App = () => {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Option | null>(null);
	const [characters, setCharacters] = useState<Option[]>([]);
	const { data: searchData, isLoading:searchLoading } = useGetStarWarsCharacters(query);
	const { data: character1, isLoading: loadingFirstCharacter } =
		useGetStarWarsCharacter(characters?.[0]?.id);
	const { data: character2, isLoading: loadingSecondCharacter } =
		useGetStarWarsCharacter(characters?.[1]?.id);
	const { data:image1 } = useGetStarWarsCharacterImage(character1?.uid)
	const { data:image2 } = useGetStarWarsCharacterImage(character2?.uid)
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

	useEffect(() => {
		onCharacterSelection();
	}, [selected]);

	const clearChars = () => {
		setCharacters([]);
		setSelected(null);
	};

	return (
		<main className="w-full min-h-screen text-center bg-center bg-[url(/src/assets/images/background.jpg)] bg-cover p-4">
			<header className="flex flex-col items-center">
				<img src={Logo} alt="logo" className="w-xs" />
				<h1 className="text-4xl font-bold text-amber-500 mb-8">
					Character Comparison
				</h1>
				<section className="flex gap-4 items-center">
					<ComboBox
					loading={searchLoading}
						value={selected}
						onChange={setSelected}
						options={searchData ?? []}
						setQuery={setQuery}
					/>
					<button onClick={clearChars} type="button" className="bg-red-500 font-semibold border border-gray-300 rounded-xl text-white hover:bg-gray-400 px-3 py-2">Reset Characters</button>
				</section>
				<section id="comparison-area" className="flex gap-2 items-center py-3">
					{hasChar1Info ? (
						<Card
						avatar={image1?.imageUrl ?? ""}
							isLoading={loadingFirstCharacter}
							character={character1}
							onClose={() => onRemoveCharacter(character1?.uid)}
						/>
					):<RobotAnimation parentClassName="w-1/2" playerNum={1}/>}
						<p className="text-6xl font-bold text-white">V.S</p>
					{hasChar2Info ? (
						<Card
						avatar={image2?.imageUrl ?? ""}
							isLoading={loadingSecondCharacter}
							character={character2}
							onClose={() => onRemoveCharacter(character2?.uid)}
						/>): (
						<RobotAnimation parentClassName="w-1/2" playerNum={2}/>
						
					)}
				</section>
			</header>
		</main>
	);
};

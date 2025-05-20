import toast, { Toaster } from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";

import { ComboBox, RobotAnimation,Logo, type Option } from "../atoms";
import { useGetStarWarsCharacter, useGetStarWarsCharacterImage, useGetStarWarsCharacters } from "@/queries";
import { Card } from "../molecules";
import { compareCharacters } from "@/helper";

export const App = () => {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Option | null>(null);
	const [characters, setCharacters] = useState<Option[]>([]);
	const { data: searchData, isLoading: searchLoading } = useGetStarWarsCharacters(query);
	const { data: character1, isLoading: loadingFirstCharacter } =
		useGetStarWarsCharacter(characters?.[0]?.id);
	const { data: character2, isLoading: loadingSecondCharacter } =
		useGetStarWarsCharacter(characters?.[1]?.id);
	const { data: image1 } = useGetStarWarsCharacterImage(character1?.uid)
	const { data: image2 } = useGetStarWarsCharacterImage(character2?.uid)
	const hasChar1Info = useMemo(
		() => character1 && !loadingFirstCharacter,
		[character1, loadingSecondCharacter],
	);
	const hasChar2Info = useMemo(
		() => character2 && !loadingSecondCharacter,
		[character2, loadingSecondCharacter],
	);

	const onCharacterSelection = () => {
		if (selected) {
			const isAlreadySelected = characters.some(
				({ id }) => id === selected.id,
			);
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
		};
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
	const placeholder = useMemo(() => {
		if (characters.length === 0) {
			return "Select Character";
		}
		if (characters.length === 1) {
			return "Select Second Character";
		}
		return "Select Another Character";
	}, [characters]);
	const {winner} = useMemo(() => {
		if (character1 && character2) {
			return compareCharacters(character1, character2);
		}
		return {
			winner: "",
			attributes: [],
		};
	}, [character1, character2]);


	return (
		<main className="w-full min-h-screen text-center bg-center bg-[url(/src/assets/images/background.jpg)] bg-cover p-4">
			<header className="flex flex-col items-center">
				<Logo />
				<section className="flex gap-4 w-2/3 items-center">
					<ComboBox
					placeholder={placeholder}
						loading={searchLoading}
						value={selected}
						onChange={setSelected}
						options={searchData ?? []}
						setQuery={setQuery}
					/>
					<button onClick={clearChars} type="button" className="bg-red-500 w-1/3 font-semibold border border-gray-300 rounded-xl text-white hover:bg-gray-400 px-3 py-2">Reset</button>
				</section>
				{winner && <section className="flex flex-col items-center gap-2 py-3">
					<h3 className="text-lg text-white font-bold">🏆 Winner: {winner} 🏆</h3>
				</section>}
				<section id="comparison-area" className="flex flex-col md:flex-row gap-2 items-center py-3">
					{hasChar1Info ? (
						<Card
							isWinner={winner === character1?.name}
							avatar={image1?.imageUrl ?? ""}
							isLoading={loadingFirstCharacter}
							character={character1}
							onClose={() => onRemoveCharacter(character1?.uid)}
						/>
					) : <RobotAnimation isLoading={loadingFirstCharacter} parentClassName="w-1/2" playerNum={1} />}
					<p className="text-6xl font-bold text-white">V.S</p>
					{hasChar2Info ? (
						<Card
						isWinner={winner === character2?.name}
							avatar={image2?.imageUrl ?? ""}
							isLoading={loadingSecondCharacter}
							character={character2}
							onClose={() => onRemoveCharacter(character2?.uid)}
						/>) : (
						<RobotAnimation isLoading={loadingSecondCharacter} parentClassName="w-1/2" playerNum={2} />

					)}
				</section>
			</header>
			 <Toaster />
		</main>
	);
};

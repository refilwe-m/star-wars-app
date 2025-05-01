import { Logo } from "@/assets";
import { useGetStarWarsCharacters } from "@/queries";
import { useState } from "react";
import { ComboBox, type Option } from "../atoms";

export const App = () => {
	const [query, setQuery] = useState("");
	const [character, setCharacter] = useState<Option | null>(null);
	const { data: searchData } = useGetStarWarsCharacters(query);

	return (
		<main className="w-full min-h-screen text-center bg-center bg-[url(/src/assets/images/background.jpg)] bg-cover p-4">
			<header className="flex flex-col items-center">
				<img src={Logo} alt="logo" className="w-md" />
				<h1 className="text-4xl font-bold text-amber-500 mb-8">
					Character Comparison
				</h1>
				<section>
					<ComboBox
						value={character}
						onChange={setCharacter}
						options={searchData ?? []}
						setQuery={setQuery}
					/>
				</section>
			</header>
		</main>
	);
};

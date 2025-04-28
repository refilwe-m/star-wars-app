import { createFileRoute } from "@tanstack/react-router";
import map from "lodash/map";

import { useGetStarWarsCharacters } from "@/queries";
import type { CharacterAPI } from "@/services/types";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data, isLoading } = useGetStarWarsCharacters();
	console.log(data, isLoading);
	return (
		<main className="w-full h-screen text-center bg-center bg-[url('../assets/images/background.jpg')]">
			{isLoading ? (
				<>isLoading...</>
			) : (
				<ul className="grid">
					{map(data, ({ name, gender }: CharacterAPI, index: number) => (
						<>
							<p>{gender} </p>
							<li className="text-blue-800 text-4xl" key={name + index}>
								{name}
							</li>
						</>
					))}
				</ul>
			)}
		</main>
	);
}

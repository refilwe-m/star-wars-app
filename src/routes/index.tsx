import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import map from "lodash";

import { StarWarsService } from "@/services";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data } = useQuery({
		queryKey: ["people"],
		queryFn: () => StarWarsService.getCharacters,
	});

	return (
		<main className="text-center">
			<ul className="grid">
				{map(data, ({ name }) => (
					<li className="text-blue-800 text-4xl" key={name}>
						{name}
					</li>
				))}
			</ul>
		</main>
	);
}

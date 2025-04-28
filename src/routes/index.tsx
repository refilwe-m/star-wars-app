import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { data } = useQuery({
		queryKey: ["people"],
		queryFn: () =>
			fetch("https://swapi.tech/api/people")
				.then((res) => res.json())
				.then((data) => data.results as { name: string }[]),
		initialData: [],
	});

	return (
		<div className="text-center">
			<ul className="grid">
				{data?.map((person) => (
					<li className="text-blue-800 text-4xl" key={person.name}>
						{person.name}
					</li>
				))}
			</ul>
		</div>
	);
}

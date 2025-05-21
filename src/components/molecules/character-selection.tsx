import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import { useGetStarWarsCharacters } from "@/queries";
import { ComboBox, type Option } from "../atoms";

export type CharacterSelection = {
	placeholder: string;
	selected: Option | null;
	setSelected: (selected: Option | null) => void;
	setCharacters: Dispatch<SetStateAction<Option[]>>;
};

export const CharacterSelection: FC<CharacterSelection> = ({
	placeholder,
	selected,
	setSelected,
	setCharacters,
}) => {
	const [query, setQuery] = useState("");
	const { data: searchData, isLoading: searchLoading } =
		useGetStarWarsCharacters(query);

	const clearChars = () => {
		setCharacters([]);
		setSelected(null);
	};

	return (
		<section className="flex gap-4 w-2/3 items-center">
			<ComboBox
				placeholder={placeholder}
				loading={searchLoading}
				value={selected}
				onChange={setSelected}
				options={searchData ?? []}
				setQuery={setQuery}
			/>
			<button
				onClick={clearChars}
				type="button"
				className="bg-red-500 w-1/3 font-semibold border border-gray-300 rounded-xl text-white hover:bg-gray-400 px-3 py-2"
			>
				Reset
			</button>
		</section>
	);
};

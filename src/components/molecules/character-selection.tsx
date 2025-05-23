import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import type { Option } from "@/common";
import { useGetStarWarsCharacters } from "@/queries";
import { isEmpty, isUndefined } from "lodash";
import { ComboBox } from "../atoms";

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
	const {
		data: searchData,
		error,
		isLoading: searchLoading,
	} = useGetStarWarsCharacters(query);

	const clearChars = () => {
		setCharacters([]);
		setSelected(null);
	};

	return (
		<section className="flex gap-4 items-center w-2/3">
			<ComboBox
				placeholder={placeholder}
				loading={searchLoading}
				value={selected}
				error={
					error?.message ??
					(isUndefined(searchData)
						? null
						: !isEmpty(searchData)
							? null
							: "No character found.")
				}
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

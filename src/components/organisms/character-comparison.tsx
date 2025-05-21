import type { FC } from "react";

import { useWinner } from "@/hooks";
import { useGetStarWarsCharacter } from "@/queries";
import { type Option, Winner } from "../atoms";
import { CharacterCard } from "./character-card";

export type CharacterComparisonProps = {
	characters: Option[];
	onDeselect: (id: string) => void;
};

export const CharacterComparison: FC<CharacterComparisonProps> = ({
	characters,
	onDeselect,
}) => {
	const [charId1, charId2] = characters.map(({ id }) => id);
	const { data: character1 } = useGetStarWarsCharacter(charId1);
	const { data: character2 } = useGetStarWarsCharacter(charId2);
	const { winner } = useWinner(character1, character2);

	return (
		<>
			{winner && <Winner winner={winner} />}
			<section
				id="comparison-area"
				className="flex flex-col md:flex-row gap-2 items-center py-3"
			>
				<CharacterCard
					id={charId1}
					winner={winner}
					playerNum={1}
					onClose={() => onDeselect(character1?.uid)}
				/>
				<p className="text-6xl font-bold text-white">V.S</p>
				<CharacterCard
					id={charId2}
					winner={winner}
					playerNum={2}
					onClose={() => onDeselect(character2?.uid)}
				/>
			</section>
		</>
	);
};

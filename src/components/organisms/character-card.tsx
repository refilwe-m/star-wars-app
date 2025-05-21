import {
	useGetStarWarsCharacter,
	useGetStarWarsCharacterImage,
} from "@/queries";
import type { FC } from "react";
import { RobotAnimation } from "../atoms";
import { Card } from "../molecules";

export type CharacterCardProps = {
	id: string;
	winner: string | null;
	onClose: (id: string) => void;
	playerNum: number;
};

export const CharacterCard: FC<CharacterCardProps> = ({
	id,
	winner,
	playerNum,
	onClose,
}) => {
	const { data: character, isLoading: loadingFirstCharacter } =
		useGetStarWarsCharacter(id);
	const { data: imageData } = useGetStarWarsCharacterImage(character?.uid);
	const hasChar1Info = character && !loadingFirstCharacter;

	return hasChar1Info ? (
		<Card
			isWinner={winner === character?.name}
			avatar={imageData?.imageUrl ?? ""}
			isLoading={loadingFirstCharacter}
			character={character}
			onClose={() => onClose(character?.uid)}
		/>
	) : (
		<RobotAnimation
			isLoading={loadingFirstCharacter}
			parentClassName="w-1/2"
			playerNum={playerNum}
		/>
	);
};

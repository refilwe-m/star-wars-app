import type { FC } from "react";

export type WinnerProps = {
	winner: string | null;
};

export const Winner: FC<WinnerProps> = ({ winner }) => {
	return (
		<section className="flex flex-col items-center gap-2 py-3">
			<h3 className="text-lg text-white font-bold">🏆 Winner: {winner} 🏆</h3>
		</section>
	);
};

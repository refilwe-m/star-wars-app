import type { CharacterAPI } from "@/services/types";
import { Calendar, Eye, Ruler, User, Weight } from "lucide-react";
import { type FC, useState } from "react";

export type CardProps = {
	character: CharacterAPI | null;
	isLoading: boolean;
	onClose: () => void;
};

export const Card: FC<CardProps> = ({ character, isLoading, onClose }) => {
	const [activeTab, setActiveTab] = useState("info");
	return isLoading ? (
		<>Loading....</>
	) : (
		<section className="w-full max-w-lg bg-black text-gray-200 rounded-lg overflow-hidden shadow-xl">
			<section className="relative h-40 bg-red-900 overflow-hidden">
				<section className="absolute inset-0 bg-gradient-to-br from-yellow-800 to-black opacity-90" />
				<section className="absolute bottom-0 left-0 w-full p-6">
					<h1 className="text-3xl font-bold text-white">{character?.name}</h1>
					<section className="flex items-center mt-2">
						<User size={16} className="mr-2" />
						<span className="text-gray-300">{character?.gender}</span>
					</section>
				</section>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-100 transition"
					aria-label="Remove character"
				>
					×
				</button>
			</section>

			{/* Tab navigation */}
			<section className="flex border-b border-gray-800">
				<button
					type="button"
					onClick={() => setActiveTab("info")}
					className={`flex-1 py-3 text-center ${activeTab === "info" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
				>
					Basic Info
				</button>
			</section>

			{/* Content based on active tab */}
			<section className="p-6">
				{activeTab === "info" && (
					<section className="space-y-4">
						<section className="grid grid-cols-2 gap-4">
							<section className="bg-gray-900 p-4 rounded-md flex items-center">
								<Ruler className="text-red-500 mr-3" size={20} />
								<section>
									<p className="text-xs text-gray-500">Height</p>
									<p>{character?.height} cm</p>
								</section>
							</section>
							<section className="bg-gray-900 p-4 rounded-md flex items-center">
								<Weight className="text-red-500 mr-3" size={20} />
								<section>
									<p className="text-xs text-gray-500">Mass</p>
									<p>{character?.mass} kg</p>
								</section>
							</section>
						</section>

						<section className="bg-gray-900 p-4 rounded-md flex items-center">
							<Eye className="text-red-500 mr-3" size={20} />
							<section className="flex-1">
								<p className="text-xs text-gray-500">Physical Appearance</p>
								<section className="flex justify-between mt-1">
									<p>Hair: {character?.hair_color}</p>
									<p>Skin: {character?.skin_color}</p>
									<p>Eyes: {character?.eye_color}</p>
								</section>
							</section>
						</section>

						<section className="bg-gray-900 p-4 rounded-md flex items-center">
							<Calendar className="text-red-500 mr-3" size={20} />
							<section>
								<p className="text-xs text-gray-500">Birth Year</p>
								<p>{character?.birth_year}</p>
							</section>
						</section>
					</section>
				)}
			</section>
		</section>
	);
};

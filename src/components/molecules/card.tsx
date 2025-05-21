import type { CharacterAPI } from "@/services/types";
import { Calendar, Eye, Ruler, User, Weight, XCircleIcon } from "lucide-react";
import { type FC, useState } from "react";

export type CardProps = {
	character: CharacterAPI | null;
	isLoading: boolean;
	onClose: () => void;
	avatar?: string;
	isWinner?: boolean;
};

export const Card: FC<CardProps> = ({
	character,
	isLoading,
	isWinner = false,
	onClose,
	avatar,
}) => {
	const [activeTab, setActiveTab] = useState("info");
	return isLoading ? (
		<>Loading....</>
	) : (
		<>
			<section
				className={`w-full ${isWinner ? "animate-pulse border-4 border-green-500" : ""} max-w-lg bg-black text-gray-200 rounded-lg overflow-hidden shadow-xl`}
			>
				<section className="relative h-40 bg-red-900 overflow-hidden">
					<button
						aria-label="Close"
						type="button"
						className="absolute z-10 top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
						onClick={onClose}
					>
						<XCircleIcon className="text-black-500" size={20} />
					</button>
					<img src={avatar} alt="Avatar" />
					<section className="absolute inset-0 bg-gradient-to-br from-red-600 to-black opacity-90" />
					<section className="absolute bottom-0 left-0 w-full p-6">
						<h1 className="text-3xl font-bold text-white">{character?.name}</h1>
						<section className="flex items-center mt-2">
							<User size={16} className="mr-2" />
							<span className="text-gray-300">{character?.gender}</span>
						</section>
					</section>
				</section>

				<section className="flex border-b border-gray-800">
					<button
						type="button"
						onClick={() => setActiveTab("info")}
						className={`flex-1 py-3 text-center ${activeTab === "info" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
					>
						Basic Info
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("image")}
						className={`flex-1 py-3 text-center ${activeTab === "image" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
					>
						Image
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("ai")}
						className={`flex-1 py-3 text-center ${activeTab === "ai" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
					>
						AI
					</button>
				</section>

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
										<span>Hair: {character?.hair_color}</span>
										<span>Skin: {character?.skin_color}</span>
										<span>Eyes: {character?.eye_color}</span>
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

							{/* <section className="bg-gray-900 p-4 rounded-md flex items-center">
              <MapPin className="text-red-500 mr-3" size={20} />
              <section>
                <p className="text-xs text-gray-500">Homeworld</p>
                <p>{planetNames[character?.homeworld] || "Unknown"}</p>
              </section>
            </section> */}
						</section>
					)}

					{activeTab === "image" && (
						<section className="space-y-3">
							<h3 className="text-lg font-semibold mb-3">Selfie</h3>
							<section className="flex justify-center">
								<img src={avatar} alt="avatar" className="w-44 h-44" />
							</section>
						</section>
					)}

					{activeTab === "ai" && (
						<section>
							<h3>AI Generated Fun Fact</h3>
							<p>{""}</p>
						</section>
					)}
				</section>
			</section>
		</>
	);
};

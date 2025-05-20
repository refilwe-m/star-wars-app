import type { CharacterAPI } from "@/services/types";
import { Calendar, Eye, Film, MapPin, Rocket, Ruler, User, Weight } from "lucide-react";
import { type FC, useState } from "react";

export type CardProps = {
	character: CharacterAPI | null;
	isLoading: boolean;
	onClose: () => void;
	avatar?: string;
};

export const Card: FC<CardProps> = ({ character, isLoading, onClose,avatar }) => {
	const [activeTab, setActiveTab] = useState("info");
	return isLoading ? (
		<>Loading....</>
	) : (
		<section className="w-full max-w-lg bg-black text-gray-200 rounded-lg overflow-hidden shadow-xl">
			<div className="relative h-40 bg-red-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-black opacity-90"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="text-3xl font-bold text-white">{character?.name}</h1>
          <div className="flex items-center mt-2">
            <User size={16} className="mr-2" />
            <span className="text-gray-300">{character?.gender}</span>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-800">
        <button 
          onClick={() => setActiveTab('info')} 
          className={`flex-1 py-3 text-center ${activeTab === 'info' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
        >
          Basic Info
        </button>
        <button 
          onClick={() => setActiveTab('films')} 
          className={`flex-1 py-3 text-center ${activeTab === 'films' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
        >
          Films
        </button>
        <button 
          onClick={() => setActiveTab('ships')} 
          className={`flex-1 py-3 text-center ${activeTab === 'ships' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400'}`}
        >
          Starships
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="p-6">
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-md flex items-center">
                <Ruler className="text-red-500 mr-3" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Height</p>
                  <p>{character?.height} cm</p>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-md flex items-center">
                <Weight className="text-red-500 mr-3" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Mass</p>
                  <p>{character?.mass} kg</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-md flex items-center">
              <Eye className="text-red-500 mr-3" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Physical Appearance</p>
                <div className="flex justify-between mt-1">
                  <span>Hair: {character?.hair_color}</span>
                  <span>Skin: {character?.skin_color}</span>
                  <span>Eyes: {character?.eye_color}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-md flex items-center">
              <Calendar className="text-red-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-gray-500">Birth Year</p>
                <p>{character?.birth_year}</p>
              </div>
            </div>
            
            {/* <div className="bg-gray-900 p-4 rounded-md flex items-center">
              <MapPin className="text-red-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-gray-500">Homeworld</p>
                <p>{planetNames[character?.homeworld] || "Unknown"}</p>
              </div>
            </div> */}
          </div>
        )}
        
        {activeTab === 'films' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">Film Appearances</h3>
           {/*  {character?.films && character?.films.map((film, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-md flex items-center">
                <Film className="text-red-500 mr-3" size={20} />
                <p>{filmTitles[film] || "Unknown Film"}</p>
              </div>
            ))} */}
          </div>
        )}
        
        {activeTab === 'ships' && (
          <div>
            {/* <h3 className="text-lg font-semibold mb-3">Starships</h3>
            {character?.starships && character?.starships.length > 0 ? (
              character?.starships.map((ship, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-md flex items-center">
                  <Rocket className="text-red-500 mr-3" size={20} />
                  <p>{starshipNames[ship] || "Unknown Starship"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No starships registered</p>
            )} */}
          </div>
        )}
      </div>
      
		</section>
	);
};

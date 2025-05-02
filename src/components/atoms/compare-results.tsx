import type { CharacterAPI } from "@/services/types";

export const CompareResults = ({
  character1,
  character2,
}: {
  character1: CharacterAPI;
  character2: CharacterAPI;
}) => {
  const compareAttributes = [
    { key: "height", label: "Height (cm)", higherBetter: true },
    { key: "mass", label: "Mass (kg)", higherBetter: true },
    { key: "birth_year", label: "Age", higherBetter: false },
  ];

  const getComparisonResult = (value1: string, value2: string, higherBetter: boolean) => {
    const num1 = parseInt(value1) || 0;
    const num2 = parseInt(value2) || 0;
    
    if (num1 === num2) return "draw";
    return (higherBetter ? num1 > num2 : num1 < num2) ? "left" : "right";
  };

  return (
    <div className="bg-black bg-opacity-70 p-4 rounded-lg min-w-[200px]">
      <h3 className="text-yellow-400 text-xl mb-4">Comparison Results</h3>
      <div className="space-y-3">
        {compareAttributes.map((attr) => {
          const result = getComparisonResult(
            character1[attr.key],
            character2[attr.key],
            attr.higherBetter
          );
          
          return (
            <div key={attr.key} className="text-left">
              <p className="text-gray-300">{attr.label}</p>
              <div className="flex justify-between items-center mt-1">
                <span className={result === "left" ? "text-green-400 font-bold" : ""}>
                  {character1[attr.key]}
                </span>
                <span className="text-gray-500 mx-2">vs</span>
                <span className={result === "right" ? "text-green-400 font-bold" : ""}>
                  {character2[attr.key]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
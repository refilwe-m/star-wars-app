type SearchFieldProps = {
	isLoading?: boolean;
	value: string;
	onChange: (value: string) => void;
};

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder="Search..."
			className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	);
};

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
export type Option = { id: string; name: string };

type ComboBoxProps = {
	value: Option | null;
	onChange: (value: Option | null) => void;
	options: Option[];
	query: string;
	setQuery: (value: string) => void;
	loading?: boolean;
};

export const ComboBox = ({
	value,
	onChange,
	options,
	query,
	setQuery,
	loading,
}: ComboBoxProps) => {
	return (
		<Combobox value={value} onChange={onChange}>
			<div className="relative">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
					<ComboboxInput
						className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						displayValue={(option: Option | null) => option?.name || ""}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search..."
					/>
					<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronsUpDownIcon className="h-5 w-5 text-gray-400" />
					</ComboboxButton>
				</div>
				{options.length > 0 && (
					<ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map((option) => (
							<ComboboxOption
								key={option.id}
								value={option}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? "bg-blue-600 text-white" : "text-gray-900"
									}`
								}
							>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
										>
											{option.name}
										</span>
										{selected ? (
											<span
												className={
													"absolute inset-y-0 left-0 flex items-center pl-3"
												}
											>
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</ComboboxOption>
						))}
					</ComboboxOptions>
				)}
				{loading && (
					<div className="absolute z-10 mt-1 w-full px-3 py-2 bg-white text-sm text-gray-500">
						Loading...
					</div>
				)}
			</div>
		</Combobox>
	);
};

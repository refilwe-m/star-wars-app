import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import { debounce } from "lodash";
import { CheckIcon, Search, XIcon } from "lucide-react";
import { ClipLoader } from "react-spinners";

export type Option = { id: string; name: string };

type ComboBoxProps = {
	value: Option | null;
	onChange: (value: Option | null) => void;
	options: Option[];
	setQuery: (value: string) => void;
	loading?: boolean;
	placeholder?: string;
};

export const ComboBox = ({
	value,
	onChange,
	options,
	setQuery,
	loading = false,
	placeholder = "Search...",
}: ComboBoxProps) => {
	return (
		<Combobox value={value} onChange={onChange}>
			<div className="relative w-full border-3 border-gray-300 rounded-2xl">
				<section className="flex items-center gap-2">
					<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white/80 text-left shadow-sm">
						<ComboboxInput
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
							displayValue={(option: Option | null) => option?.name || ""}
							onChange={(event) =>{
								const value = event.target.value;
								debounce(() => {
									setQuery(value);
								}, 1000)();
							}}
							placeholder={placeholder}
						/>
						<section className="absolute inset-y-0 right-0 flex items-center pr-2">
							<Search className="h-5 w-5 text-gray-400 md:visible invisible" />
							<button
						aria-label="Clear search"
						onClick={() => {
							onChange(null);
							setQuery("");
						}}
						type="button"
						className="px-2 py-3 text-xs"
					>
						<XIcon className="h-3 w-3 text-gray-400 hover:h-4 hover:w-4" />
					</button>
						</section>
					</div>
					
				</section>

				{loading ? <ClipLoader /> : (
					<ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
						{options.map((option) => (
							<ComboboxOption
								key={option.id}
								value={option}
								className={({ focus }) =>
									`relative cursor-default select-none py-2 px-2 ${
										focus ? "bg-blue-600 text-white" : "text-gray-900"
									}`
								}
							>
								{({ selected }) => (
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
			</div>
		</Combobox>
	);
};

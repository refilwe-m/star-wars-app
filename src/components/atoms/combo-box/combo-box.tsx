import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { ClipLoader } from "react-spinners";

import type { Option } from "@/common";
import type { ComboBoxProps } from "./types";

export const ComboBox = ({
	value,
	onChange,
	options,
	setQuery,
	loading = false,
	placeholder = "Search...",
	error = null,
}: ComboBoxProps) => {
	const debouncedSetQuery = useMemo(
		() => debounce((value: string) => setQuery(value), 1000),
		[setQuery],
	);

	useEffect(() => {
		return () => {
			debouncedSetQuery.cancel();
		};
	}, [debouncedSetQuery]);

	return (
		<Combobox value={value} onChange={onChange}>
			<div className="relative w-full rounded-2xl">
				<section className="flex items-center gap-2">
					<div className="relative w-full overflow-hidden rounded-xl bg-white/80 text-left shadow-sm">
						<ComboboxInput
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
							displayValue={(option: Option | null) => option?.name || ""}
							onChange={(event) => {
								const value = event.target.value;
								debouncedSetQuery(value);
							}}
							placeholder={placeholder}
						/>
					</div>
					<section className=" flex items-center pr-2">
						<button
							aria-label="Clear search"
							onClick={() => {
								onChange(null);
								setQuery("");
							}}
							type="button"
							className="p-2 text-xs text-gray-500 rounded-lg z-90 bg-white/80 hover:bg-gray-200"
						>
							<XIcon className="h-4 w-4 text-gray-500 hover:h-4 hover:w-4" />
						</button>
					</section>
				</section>

				{loading ? (
					<p className="flex items-center gap-2 justify-center text-white">
						<ClipLoader size={20} color="white" /> Searching...
					</p>
				) : (
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
				{error && (
					<p className="absolute z-10 mt-1 w-full rounded-md bg-red-500 py-1 text-base text-white">
						{error}
					</p>
				)}
			</div>
		</Combobox>
	);
};

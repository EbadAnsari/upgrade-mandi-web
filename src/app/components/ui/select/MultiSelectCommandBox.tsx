import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { BaseSelectorProps } from "./SelectBox";

export type MultiSelectCommandBoxProps<T extends string> = Readonly<
	BaseSelectorProps<T>
> & {
	label: string;
	selected: Map<T, boolean>;
	onChange?: (value: Map<T, boolean>) => void;
};

export function MultiSelectCommandBox<T extends string>({
	items,
	selected,
	onChange,
	label,
}: MultiSelectCommandBoxProps<T>) {
	const [search, setSearch] = useState("");

	const filteredItems = search
		? items.filter((item) =>
				item.label.toLowerCase().includes(search.toLowerCase())
		  )
		: items;

	return (
		<Command>
			{label && (
				<CommandInput
					placeholder={label}
					className="h-9"
					onValueChange={setSearch}
				/>
			)}

			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>

				<CommandGroup>
					{filteredItems.map((item) => {
						const isSelected = !!selected.get(item.value);

						return (
							<CommandItem
								key={item.value}
								value={item.value}
								onSelect={() => {
									selected.set(
										item.value,
										!selected.get(item.value)
									);
									onChange?.(selected);
								}}
							>
								{item.label}
								<Check
									className={cn(
										"ml-auto w-4 h-4",
										isSelected ? "opacity-100" : "opacity-0"
									)}
								/>
							</CommandItem>
						);
					})}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

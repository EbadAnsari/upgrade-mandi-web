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

export type SingleSelectCommandBoxProps<T extends string> = Readonly<
	BaseSelectorProps<T>
> & {
	label: string;
	selected: T;
	onChange?: (value: T) => void;
};

export function SingleSelectCommandBox<T extends string>({
	items,
	selected,
	onChange,
	label,
}: SingleSelectCommandBoxProps<T>) {
	const [search, setSearch] = useState("");

	const filteredItems = search
		? items.filter((item) =>
				item.label.toLowerCase().includes(search.toLowerCase())
		  )
		: items;

	return (
		<Command value={selected}>
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
					{filteredItems.map((item) => (
						<CommandItem
							key={item.value}
							value={item.value}
							onSelect={() => onChange?.(item.value)}
						>
							{item.label}
							<Check
								className={cn(
									"ml-auto",
									selected === item.value
										? "opacity-100"
										: "opacity-0"
								)}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

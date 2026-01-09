"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface BaseSelectorProps<T> {
	selected?: T;
	error?: boolean;
	onChange?: (value: T) => void;
}

export interface Item {
	value: string;
	label: string;
}

export interface SelectProps<T> extends Readonly<BaseSelectorProps<T>> {
	items: Item[];
	icon?: ReactNode;
	label: string;
}

interface ComboboxDemoProps<T> extends Readonly<SelectProps<T>> {
	ComboInput?: ReactNode;
}

export function Combobox<T>({
	icon,
	error,
	items,
	label,
	onChange,
	ComboInput,
	selected,
}: ComboboxDemoProps<T>) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(selected ?? "");
	const valueCheck = useRef(value);

	useEffect(() => {
		if (value !== valueCheck.current) {
			onChange?.(value as T);
		} else if (value !== selected) {
			setValue(selected ?? "");
		}
		valueCheck.current = value;
	});

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant={error ? "destructive" : "outline"}
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{icon ? (
						<div className="flex justify-center items-center rounded-xs size-3 font-display text-zinc-500 text-xs">
							{icon}
						</div>
					) : null}
					{value
						? items.find((item) => item.value === value)?.label
						: label}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="p-0 w-[200px]"
			>
				<Command
					defaultValue={
						selected ?? items.length > 0 ? items[0].value : ""
					}
				>
					{ComboInput}
					<CommandList>
						<CommandEmpty>Not found.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue
										);
										setOpen(false);
									}}
								>
									{item.label}
									<Check
										className={cn(
											"ml-auto",
											value === item.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

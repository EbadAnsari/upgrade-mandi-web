"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
	MultiSelectCommandBox,
	MultiSelectCommandBoxProps,
} from "./MultiSelectCommandBox";
import { BaseSelectorProps } from "./SelectBox";
import {
	SingleSelectCommandBox,
	SingleSelectCommandBoxProps,
} from "./SingleSelectCommandBox";

export type ComboBoxProps<T extends string> = Readonly<BaseSelectorProps<T>> &
	(
		| ({
				multiSelect?: false;
		  } & SingleSelectCommandBoxProps<T>)
		| ({
				multiSelect: true;
		  } & MultiSelectCommandBoxProps<T>)
	);

export function Combobox<T extends string>({
	multiSelect,
	items,
	label,
	selected,
	icon,
	error,
	onChange,
}: ComboBoxProps<T>) {
	const [open, setOpen] = useState(false);

	// Determine button label for single-select
	const buttonLabel =
		!multiSelect && typeof selected === "string"
			? items.find((item) => item.value === selected)?.label ?? label
			: label;

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant={error ? "destructive" : "outline"}
					role="combobox"
					aria-expanded={false}
					className="justify-between"
				>
					{icon && (
						<div className="flex justify-center items-center size-3 text-zinc-500 text-xs">
							{icon}
						</div>
					)}
					{buttonLabel}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				className="p-0 w-[200px]"
			>
				{multiSelect ? (
					<MultiSelectCommandBox
						items={items}
						label={label}
						selected={selected}
						onChange={(value) => {
							onChange?.(value);
							setOpen(false);
						}}
						error={error}
						icon={icon}
					/>
				) : (
					<SingleSelectCommandBox
						items={items}
						label={label}
						selected={selected as T}
						onChange={(value) => {
							onChange?.(value);
							setOpen(false);
						}}
						error={error}
						icon={icon}
					/>
				)}
			</PopoverContent>
		</Popover>
	);
}

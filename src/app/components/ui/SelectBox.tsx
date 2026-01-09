import { CommandInput } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SelectProps } from "./ComboBox";

function SelectInput({
	className,
	...props
}: React.ComponentProps<typeof CommandInput>) {
	return (
		<Input
			className={cn("w-full", className)}
			{...props}
		/>
	);
}

export default function SelectBox<T extends string>({
	items,
	error,
	icon,
	label,
	onChange,
	selected,
}: Readonly<SelectProps<T>>) {
	const [selectedItem, changeSelection] = useState(selected ?? "");

	return (
		<Select defaultValue={selected ?? undefined}>
			<SelectTrigger className="bg-white focus-visible:border-transparent">
				<SelectValue
					placeholder={label}
					className="capitalize"
				/>
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem
						key={String(item.value)}
						value={String(item.value)}
						className={`${
							item.value === selectedItem
								? "bg-accent text-accent-foreground"
								: ""
						} capitalize flex justify-between`}
						onSelect={() => {
							changeSelection(item.value);
						}}
					>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

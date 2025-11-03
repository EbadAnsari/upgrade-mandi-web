import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { Item } from "./ComboBox";

export type SelectBoxProps = {
	items: Item[];
} & (
	| { selectLabel: string; defaultValue?: null }
	| { selectLabel?: null; defaultValue: string | number }
);

export default function SelectBox({
	selectLabel,
	items,
	defaultValue,
}: Readonly<SelectBoxProps>) {
	const [selectedItem, changeSelection] = useState(
		typeof defaultValue === "number"
			? items[defaultValue]
				? items[defaultValue]!
				: { label: "", value: "" }
			: items.find((item) => item.value === defaultValue) ?? {
					label: "",
					value: "",
			  }
	);

	return (
		<Select>
			<SelectTrigger className="bg-white focus-visible:border-transparent">
				<SelectValue
					placeholder={selectLabel}
					className="capitalize"
				/>
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem
						key={item.value}
						value={item.value}
						className={`${
							item.value === selectedItem?.value
								? "bg-accent text-accent-foreground"
								: ""
						} capitalize`}
						onClick={() => {
							changeSelection(item);
						}}
					>
						{item.label}
						<Check
							className={cn(
								"ml-auto",
								item.value === selectedItem.value
									? "opacity-100"
									: "opacity-0"
							)}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

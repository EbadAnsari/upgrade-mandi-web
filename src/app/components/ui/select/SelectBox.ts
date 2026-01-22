import { ReactNode } from "react";

export interface Item<T extends string> {
	value: T;
	label: string;
}

export interface BaseSelectorProps<T extends string> {
	error?: boolean;
	items: Item<T>[];
	icon?: ReactNode;
	label: string;
}

export interface SelectProps<T extends string> extends Readonly<BaseSelectorProps<T>> {
	selected: T;
	onChange?: (value: T) => void;
}

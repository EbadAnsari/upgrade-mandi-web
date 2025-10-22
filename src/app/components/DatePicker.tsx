"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	label: string;
	onPick?: (date: Date) => void;
}

export function DatePicker({ label, onPick }: DatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date>(new Date());

	function datePicked(date: Date) {
		setDate(date);
		onPick?.(date);
		setOpen(false);
	}

	return (
		<div className="flex flex-col gap-3">
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date
							? date.toLocaleDateString("en-US", {
									day: "2-digit",
									month: "short",
									year: "numeric",
							  })
							: "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							if (!date) return;
							datePicked(date);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

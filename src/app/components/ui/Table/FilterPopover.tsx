import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DateEquality,
	DateRange,
	DateRelative,
} from "@/utils/filter/operators/date";
import { NumberOperators } from "@/utils/filter/operators/number";
import { StatusOperators } from "@/utils/filter/operators/status";
import { StringOperators } from "@/utils/filter/operators/string";
import { BinaryOperation, Datatype, Filter } from "@/utils/filter/type";
import type { Nullable } from "@/utils/types";
import { extractValuesFromEnum } from "@/utils/utils";
import { ChevronsUpDown } from "lucide-react";
import SelectBox from "../SelectBox";

// String.prototype.toTitleCase = function () {
// 	return this.replace(/\w\S*/g, function (txt) {
// 		return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
// 	});
// };

interface FilterOperatorProps {
	type: Datatype["type"];
}

function FilterOperatorSelector({ type }: FilterOperatorProps) {
	switch (type) {
		case "string":
			return (
				<SelectBox
					items={(
						extractValuesFromEnum(StringOperators) as string[]
					).map((operator) => ({
						value: operator,
						label: operator,
					}))}
					selectLabel="Select operator"
				/>
			);
		case "number":
			return (
				<SelectBox
					items={(
						extractValuesFromEnum(NumberOperators) as string[]
					).map((operator) => ({
						value: operator,
						label: operator.toTitleCase(),
					}))}
					selectLabel="Select Operator"
				/>
			);
		case "select":
			return (
				<SelectBox
					items={(
						extractValuesFromEnum(StatusOperators) as string[]
					).map((operator) => ({
						value: operator,
						label: operator.toTitleCase(),
					}))}
					selectLabel="Select Operator"
				/>
			);
		case "date":
			const dateOperators: string[] = extractValuesFromEnum(
				DateEquality
			) as string[];
			dateOperators.push(
				...(extractValuesFromEnum(DateRange) as string[])
			);
			dateOperators.push(
				...(extractValuesFromEnum(DateRelative) as string[])
			);
			return (
				<SelectBox
					items={dateOperators.map((operator) => ({
						value: operator,
						label: operator.toTitleCase(),
					}))}
					selectLabel="Select Operator"
				/>
			);
		case "boolean":
			return null;
	}
}

export interface FilterPopoverProps {
	filter: Nullable<Filter>;
}

function FilterComponent({ filter }: { filter: BinaryOperation }) {
	return <FilterOperatorSelector type={filter.type} />;
}

export default function FilterPopover({
	filter,
}: Readonly<FilterPopoverProps>) {
	if (!filter) return null;
	return (
		<Collapsible open>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="bg-red-50 mb-2"
				>
					Filters
					<ChevronsUpDown className="h-4 w-4" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="bg-secondary rounded-lg p-2">
				<div>
					{!filter.logicalOperator && (
						<FilterComponent filter={filter.operations} />
					)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

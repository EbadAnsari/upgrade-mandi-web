import { BooleanOperators } from "./operate/boolean";
import { DateEquality, DateRange, DateRelative } from "./operate/date";
import { NumberOperators } from "./operate/number";
import { StringOperators } from "./operate/string";

export type LogiocalOperqator = "AND" | "OR";
export type LogicalNegation = boolean | null | undefined;

export type Datatype = "number" | "string" | "date" | "boolean";

export type DateOperation = {
	type: "date";
} & (
	| {
			dateOperationType: "equality";
			operator:
				| DateEquality.eq
				| DateEquality.neq
				| DateEquality.after
				| DateEquality.notAfter
				| DateEquality.before
				| DateEquality.before
				| DateEquality.notBefore;
			filterValue: Date;
	  }
	| {
			dateOperationType: "range";
			operator: DateRange.between | DateRange.notBetween;
			dateRangeStart: Date;
			dateRangeEnd: Date;
	  }
	| {
			dateOperationType: "relative";
			operator:
				| DateRelative.eq_day
				| DateRelative.neq_day
				| DateRelative.eq_month
				| DateRelative.neq_month
				| DateRelative.eq_year
				| DateRelative.neq_year
				| DateRelative.eq_day_of_week
				| DateRelative.neq_day_of_week;
			filterValue: number;
	  }
);

export type BinaryOperation = { fieldId: string } & (
	| {
			type: "number";
			operator: NumberOperators;
			filterValue: number;
	  }
	| {
			type: "string";
			operator: StringOperators;
			filterValue: string;
			caseSensitive: boolean;
	  }
	| DateOperation
	| {
			type: "boolean";
			operator: BooleanOperators;
			filterValue: boolean;
	  }
);

type ParentId = string;
export type FilterId = `${ParentId}-${string}` | "root";

export type Filter = { negation?: LogicalNegation; filterId: string } & (
	| {
			logicalOperator: LogiocalOperqator;
			operations: Filter[];
	  }
	| {
			logicalOperator?: null;
			operations: BinaryOperation;
	  }
);

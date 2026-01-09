export class DateType {
	name = "date" as const;
	storedDatatype = new Date();
}

export enum DateEqualityOperators {
	"eq" = "=",
	"neq" = "!=",
	"after" = "after",
	"before" = "before",
}

export enum DateRangeOperators {
	"between" = "between",
}

export enum DateRelativeOperators {
	"eq_day" = "eq_day",
	"eq_month" = "eq_month",
	"eq_year" = "eq_year",

	"eq_day_of_week" = "eq_day_of_week",
}

export enum DateOperationType {
	"equality" = "equality",
	"range" = "range",
	"relative" = "relative",
}

export type DateOperation = {
	type: DateType;
} & (
	| {
			dateOperationType: DateOperationType.equality;
			operator:
				| DateEqualityOperators.eq
				| DateEqualityOperators.neq
				| DateEqualityOperators.after
				| DateEqualityOperators.before
				| DateEqualityOperators.before;
			filterValue: Date;
	  }
	| {
			dateOperationType: DateOperationType.range;
			operator: DateRangeOperators.between;
			filterValue: {
				dateRangeStart: Date;
				dateRangeEnd: Date;
			};
	  }
	| {
			dateOperationType: DateOperationType.relative;
			operator:
				| DateRelativeOperators.eq_day
				| DateRelativeOperators.eq_month
				| DateRelativeOperators.eq_year
				| DateRelativeOperators.eq_day_of_week;
			filterValue: number;
	  }
);

function evalDateEquality(
	fieldValue: DateType["storedDatatype"],
	operator: DateEqualityOperators,
	filterValue: DateType["storedDatatype"]
) {
	switch (operator) {
		case DateEqualityOperators.eq:
			return fieldValue.getTime() === filterValue.getTime();
		case DateEqualityOperators.neq:
			return fieldValue.getTime() !== filterValue.getTime();
		case DateEqualityOperators.after:
			return fieldValue.getTime() > filterValue.getTime();
		case DateEqualityOperators.before:
			return fieldValue.getTime() < filterValue.getTime();
	}
}

function evalDateRange(
	fieldValue: DateType["storedDatatype"],
	operator: DateRangeOperators,
	filterDateStart: DateType["storedDatatype"],
	filterDateEnd: DateType["storedDatatype"]
) {
	switch (operator) {
		case DateRangeOperators.between:
			return (
				filterDateStart.getTime() <= fieldValue.getTime() &&
				fieldValue.getTime() <= filterDateEnd.getTime()
			);
	}
}

function evalDateRelative(
	fieldDate: DateType["storedDatatype"],
	operator: DateRelativeOperators,
	filterValue: number
) {
	switch (operator) {
		case DateRelativeOperators.eq_day:
			return fieldDate.getDate() === filterValue;
		case DateRelativeOperators.eq_month:
			return fieldDate.getMonth() === filterValue;
		case DateRelativeOperators.eq_year:
			return fieldDate.getFullYear() === filterValue;
		case DateRelativeOperators.eq_day_of_week:
			return fieldDate.getDay() === filterValue;
	}
}

export function evalDate(
	operation: DateOperation,
	fieldValue: DateType["storedDatatype"]
) {
	switch (operation.dateOperationType) {
		case "equality":
			return evalDateEquality(
				fieldValue,
				operation.operator,
				operation.filterValue
			);
		case "range":
			return evalDateRange(
				fieldValue,
				operation.operator,
				operation.filterValue.dateRangeStart,
				operation.filterValue.dateRangeEnd
			);
		case "relative":
			return evalDateRelative(
				fieldValue,
				operation.operator,
				operation.filterValue
			);
	}
}

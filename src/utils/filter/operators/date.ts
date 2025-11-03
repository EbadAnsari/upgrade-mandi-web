export interface DateType {
	type: "date";
	storedDatatype: Date;
}

export enum DateEquality {
	"eq" = "=",
	"neq" = "!=",
	"after" = "after",
	"before" = "before",
}

export enum DateRange {
	"between" = "between",
}

export enum DateRelative {
	"eq_day" = "eq_day",
	"eq_month" = "eq_month",
	"eq_year" = "eq_year",

	"eq_day_of_week" = "eq_day_of_week",
}

export type DateOperation = {
	type: DateType["type"];
} & (
	| {
			dateOperationType: "equality";
			dateOperator:
				| DateEquality.eq
				| DateEquality.neq
				| DateEquality.after
				| DateEquality.before
				| DateEquality.before;
			filterValue: Date;
	  }
	| {
			dateOperationType: "range";
			dateOperator: DateRange.between;
			dateRangeStart: Date;
			dateRangeEnd: Date;
	  }
	| {
			dateOperationType: "relative";
			dateOperator:
				| DateRelative.eq_day
				| DateRelative.eq_month
				| DateRelative.eq_year
				| DateRelative.eq_day_of_week;
			filterValue: number;
	  }
);

function evalDateEquality(
	fieldValue: DateType["storedDatatype"],
	operator: DateEquality,
	filterValue: DateType["storedDatatype"]
) {
	switch (operator) {
		case DateEquality.eq:
			return fieldValue.getTime() === filterValue.getTime();
		case DateEquality.neq:
			return fieldValue.getTime() !== filterValue.getTime();
		case DateEquality.after:
			return fieldValue.getTime() > filterValue.getTime();
		case DateEquality.before:
			return fieldValue.getTime() < filterValue.getTime();
	}
}

function evalDateRange(
	fieldValue: DateType["storedDatatype"],
	operator: DateRange,
	filterDateStart: DateType["storedDatatype"],
	filterDateEnd: DateType["storedDatatype"]
) {
	switch (operator) {
		case DateRange.between:
			return (
				filterDateStart.getTime() <= fieldValue.getTime() &&
				fieldValue.getTime() <= filterDateEnd.getTime()
			);
	}
}

function evalDateRelative(
	fieldDate: DateType["storedDatatype"],
	operator: DateRelative,
	filterValue: number
) {
	switch (operator) {
		case DateRelative.eq_day:
			return fieldDate.getDate() === filterValue;
		case DateRelative.eq_month:
			return fieldDate.getMonth() === filterValue;
		case DateRelative.eq_year:
			return fieldDate.getFullYear() === filterValue;
		case DateRelative.eq_day_of_week:
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
				operation.dateOperator,
				operation.filterValue
			);
		case "range":
			return evalDateRange(
				fieldValue,
				operation.dateOperator,
				operation.dateRangeStart,
				operation.dateRangeEnd
			);
		case "relative":
			return evalDateRelative(
				fieldValue,
				operation.dateOperator,
				operation.filterValue
			);
	}
}

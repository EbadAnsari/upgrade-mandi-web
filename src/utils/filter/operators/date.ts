export enum DateEquality {
	"eq" = "=",
	"neq" = "!=",
	"after" = "after",
	"notAfter" = "notAfter",
	"before" = "before",
	"notBefore" = "notBefore",
}

export enum DateRange {
	"between" = "between",
	"notBetween" = "notBetween",
}

export enum DateRelative {
	"eq_day" = "eq_day",
	"neq_day" = "neq_day",
	"eq_month" = "eq_month",
	"neq_month" = "neq_month",
	"eq_year" = "eq_year",
	"neq_year" = "neq_year",

	"eq_day_of_week" = "eq_day_of_week",
	"neq_day_of_week" = "neq_day_of_week",
}

export type DateOperation = {
	type: "date";
} & (
	| {
			dateOperationType: "equality";
			dateOperator:
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
			dateOperator: DateRange.between | DateRange.notBetween;
			dateRangeStart: Date;
			dateRangeEnd: Date;
	  }
	| {
			dateOperationType: "relative";
			dateOperator:
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

function evalDateEquality(
	fieldValue: Date,
	operator: DateEquality,
	filterValue: Date
) {
	switch (operator) {
		case DateEquality.eq:
			return fieldValue.getTime() === filterValue.getTime();
		case DateEquality.neq:
			return fieldValue.getTime() !== filterValue.getTime();
		case DateEquality.after:
			return fieldValue.getTime() > filterValue.getTime();
		case DateEquality.notAfter:
			return fieldValue.getTime() <= filterValue.getTime();
		case DateEquality.before:
			return fieldValue.getTime() < filterValue.getTime();
		case DateEquality.notBefore:
			return fieldValue.getTime() >= filterValue.getTime();
	}
}

function evalDateRange(
	fieldValue: Date,
	operator: DateRange,
	filterDateStart: Date,
	filterDateEnd: Date
) {
	switch (operator) {
		case DateRange.between:
			return (
				filterDateStart.getTime() <= fieldValue.getTime() &&
				fieldValue.getTime() <= filterDateEnd.getTime()
			);
		case DateRange.notBetween:
			return !(
				filterDateStart.getTime() <= fieldValue.getTime() &&
				fieldValue.getTime() <= filterDateEnd.getTime()
			);
	}
}

function evalDateRelative(
	fieldDate: Date,
	operator: DateRelative,
	filterValue: number
) {
	switch (operator) {
		case DateRelative.eq_day:
			return fieldDate.getDate() === filterValue;
		case DateRelative.neq_day:
			return fieldDate.getDate() !== filterValue;
		case DateRelative.eq_month:
			return fieldDate.getMonth() === filterValue;
		case DateRelative.neq_month:
			return fieldDate.getMonth() !== filterValue;
		case DateRelative.eq_year:
			return fieldDate.getFullYear() === filterValue;
		case DateRelative.neq_year:
			return fieldDate.getFullYear() !== filterValue;
		case DateRelative.eq_day_of_week:
			return fieldDate.getDay() === filterValue;
		case DateRelative.neq_day_of_week:
			return fieldDate.getDay() !== filterValue;
	}
}

export function evalDate(operation: DateOperation, fieldValue: Date) {
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

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

export function evalDateEquality(
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

export function evalDateRange(
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

export function evalDateRelative(
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

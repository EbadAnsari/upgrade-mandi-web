import { DateOperation, DateType } from "./operators/date";
import { NumberOperation, NumberType } from "./operators/number";
import { StatusOperation, StatusType } from "./operators/status";
import { StringOperation, StringType } from "./operators/string";

export type LogicalOperqator = "AND" | "OR";
export type LogicalNegation = boolean | null | undefined;

export type Datatype = NumberType | StringType | DateType | StatusType;

export type BinaryOperation = { fieldId: string } & (
	| NumberOperation
	| StringOperation
	| DateOperation
	| StatusOperation
);

export type CurrentFilterId = string;
export type FilterId = `${CurrentFilterId}-${string}` | "root";

export type Filter = { negation?: LogicalNegation; filterId: string } & (
	| {
			logicalOperator: LogicalOperqator;
			operations: Filter[];
	  }
	| {
			logicalOperator?: null;
			operations: BinaryOperation;
	  }
);

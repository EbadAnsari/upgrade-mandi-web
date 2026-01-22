import { RowData } from "@tanstack/react-table";
import { RowBody } from "./RowBody";
import { RowHeader } from "./RowHeader";

export type RowProps<TData> = {
	rowType: "header" | "body";
};

export default function Row<TData extends RowData>({
	rowType,
}: Readonly<RowProps<TData>>) {
	return rowType === "header" ? <RowHeader /> : <RowBody />;
}

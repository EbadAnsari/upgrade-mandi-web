import NavTab from "./NavTab";
import TableEditor from "./TableEditor";

export interface DatabaseProps {}

export default function Database({}: Readonly<DatabaseProps>) {
	return false ? null : (
		<NavTab
			items={[
				{
					key: "view-1",
					label: "Table View",
					content: <TableEditor />,
				},
				{
					key: "view-2",
					label: "Table View",
					content: "Hello World!",
				},
			]}
		/>
	);
}

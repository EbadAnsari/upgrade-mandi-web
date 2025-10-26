import App from "./App";

export interface AppWrapperProps {}

export default function AppWrapper({}: Readonly<AppWrapperProps>) {
	return (
		// <TableDataProviders
		// 	data={_data}
		// 	columns={_columns}
		// >
		<App />
		// </TableDataProviders>
	);
}

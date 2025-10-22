import App from "./App";
import TableDataProviders from "./providers/TableDataProviders";

export interface AppWrapperProps {}

export default function AppWrapper({}: Readonly<AppWrapperProps>) {
	return (
		<TableDataProviders>
			<App />
		</TableDataProviders>
	);
}

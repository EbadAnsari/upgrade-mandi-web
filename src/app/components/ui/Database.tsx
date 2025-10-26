"use client";

import EditTableView from "../database-view/EditTableView";
import NavTab from "./NavTab";

export function Database() {
	return (
		<section className="w-full flex justify-center">
			<div className="container mx-4 flex min-h-screen flex-col p-4">
				<h3 className="scroll-m-20 text-2xl font-semibold mb-4 tracking-tight">
					B2B
				</h3>
				<NavTab
					items={[
						{
							key: "view-1",
							label: "Table View",
							content: <EditTableView />,
						},
						{
							key: "view-2",
							label: "Table View",
							content: "Hello World!",
						},
					]}
				/>
			</div>
		</section>
	);
}

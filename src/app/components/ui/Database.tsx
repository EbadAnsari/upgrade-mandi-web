"use client";

import EditTableView from "../database-view/EditTableView";
import NavTab from "./NavTab";

export function Database() {
	return (
		<section className="flex justify-center w-full">
			<div className="flex flex-col mx-4 p-4 min-h-screen container">
				<h3 className="mb-4 font-semibold text-2xl tracking-tight scroll-m-20">
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
							label: "Graph View",
							content: "Hello World!",
						},
					]}
				/>
			</div>
		</section>
	);
}

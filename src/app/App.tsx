"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "./components/SideBar";
import { Database } from "./components/ui/Database";
import NavBar from "./components/ui/NavBar";

export default function App() {
	// supabase.then(async (client) => {
	// 	const response = await client.from("customer_details").select("*");
	// 	console.log("This is result.");
	// 	console.log(response);
	// });

	return (
		<section className="">
			<SidebarProvider>
				<SideBar />
				<main className="flex flex-col w-full bg-zinc-50">
					<NavBar />
					<Database />
				</main>
			</SidebarProvider>
		</section>
	);
}

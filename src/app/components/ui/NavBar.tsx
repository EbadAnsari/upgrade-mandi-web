"use client";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface NavBarProps {}

export default function NavBar({}: Readonly<NavBarProps>) {
	return (
		<nav className="h-16 px-4 border-b border-zinc-300 w-full">
			<SidebarTrigger />
			<Input
				placeholder="Search..."
				className="m-4 w-1/3"
			/>
		</nav>
	);
}

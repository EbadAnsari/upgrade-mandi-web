"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronRight, ChevronsUpDownIcon } from "lucide-react";
import LetterIcon from "./LetterIcon";

const domainItems = [
	{
		title: "B2B",
		url: "/B2B",
		icon: LetterIcon.bind(null, {
			letter: "B",
			className: "bg-accent-b2b",
		}),
	},
	{
		title: "Zepto",
		url: "/zepto",
		icon: LetterIcon.bind(null, {
			letter: "Z",
			className: "bg-accent-zepto",
		}),
	},
	{
		title: "Swiggy",
		url: "/swiggy",
		icon: LetterIcon.bind(null, {
			letter: "S",
			className: "bg-accent-swiggy",
		}),
	},
];

function SideBarMenu({
	menu,
	items,
}: {
	menu: string;
	items: Array<{ title: string; url: string; icon: React.ComponentType }>;
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{menu}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a
									href={item.url}
									className="flex justify-between"
								>
									<div className="flex gap-2 items-center">
										<item.icon />
										<span className="font-semibold">
											{item.title}
										</span>
									</div>
									<ChevronRight className="h-4 stroke-zinc-200" />
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

export function SideBar() {
	return (
		<Sidebar className="bg-sidebar">
			<SidebarHeader className="">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							className="flex flex-row mx-1 mt-3 bg-secondary active:bg-zinc-200 rounded-sm justify-between items-center"
						>
							<div className="w-full h-max flex ">
								<div className="text-base tracking-tight font-medium uppercase">
									upgrade{" "}
									<span className="font-bold">mandi</span>
								</div>
								{/* <div className="font-light leading-1 uppercase">mandi</div> */}
							</div>
							<ChevronsUpDownIcon className="h-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48">
						<div className="flex flex-col">Hello World!</div>
					</PopoverContent>
				</Popover>
				{/* <SidebarTrigger /> */}
			</SidebarHeader>
			<SidebarContent className="">
				<SideBarMenu
					menu="Domain Input"
					items={domainItems}
				/>
			</SidebarContent>
		</Sidebar>
	);
}

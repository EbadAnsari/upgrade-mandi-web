import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface TabItem {
	key: string;
	label: ReactNode;
	content: ReactNode;
}

export interface TabProps {
	items: TabItem[];
}

export default function NavTab({ items }: Readonly<TabProps>) {
	return (
		<Tabs defaultValue="view-1">
			<TabsList className="gap-4">
				{items.map((item) => (
					<TabsTrigger
						key={item.key}
						value={item.key}
					>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{items.map((item) => (
				<TabsContent
					key={item.key}
					value={item.key}
				>
					{item.content}
				</TabsContent>
			))}
		</Tabs>
	);
}

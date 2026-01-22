import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export interface NotToggleProps {
	className?: string;
}

export default function NotToggle({ className }: Readonly<NotToggleProps>) {
	return (
		<Toggle
			aria-label="Toggle bookmark"
			size="sm"
			// variant="outline"
			className={cn(
				"bg-white data-[state=on]:bg-red-500 px-2 data-[state=on]:text-white",
				className,
			)}
		>
			Not
		</Toggle>
	);
}

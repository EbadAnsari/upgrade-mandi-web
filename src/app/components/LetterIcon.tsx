import { twMerge } from "tailwind-merge";

export interface LetterIconProps {
	letter: string;
	className?: string;
}

export default function LetterIcon({
	letter,
	className,
}: Readonly<LetterIconProps>) {
	return (
		<div
			className={twMerge(
				"bg-pink-400 h-6 flex items-center font-display justify-center aspect-square font-bold text-white rounded-sm",
				className
			)}
		>
			{letter}
		</div>
	);
}

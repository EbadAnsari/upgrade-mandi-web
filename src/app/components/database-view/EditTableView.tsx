import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { DatePicker } from "../DatePicker";
import { Combobox } from "../ui/ComboBox";
import TableEditor from "../ui/TableEditor";

import { _columns, _data } from "./../../providers/data";

export interface EditTableViewProps {}

const formSchema = z.object({
	date: z.date(),
	cname: z
		.string()
		.min(2, { message: "CNAME must be at least 2 characters." }),
	location: z
		.string()
		.min(2, { message: "Location must be at least 2 characters." }),
});

const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];
export default function EditTableView({}: Readonly<EditTableViewProps>) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date(),
			cname: "",
			location: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				// onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Date</FormLabel>
							<FormControl>
								<DatePicker
									label="Select Date"
									onPick={(date) => {
										console.log(date);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-8">
					<FormField
						control={form.control}
						name="cname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select Customer</FormLabel>
								<FormControl>
									<Combobox items={frameworks} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Customer Location</FormLabel>
								<FormControl>
									<Combobox items={frameworks} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="bg-white p-4 rounded-lg border border-zinc-200">
					<TableEditor
						schema={_columns}
						data={_data}
					/>
				</div>
			</form>
		</Form>
	);
}

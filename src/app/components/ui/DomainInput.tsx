"use client";

import { z } from "zod";

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
import { DatePicker } from "../DatePicker";
import { Combobox } from "./ComboBox";
import Database from "./Database";

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

const formSchema = z.object({
	date: z.date(),
	cname: z
		.string()
		.min(2, { message: "CNAME must be at least 2 characters." }),
});

export function DomainInput() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date(),
			cname: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<section className="w-full flex justify-center">
			<div className="container mx-4 flex min-h-screen flex-col p-4">
				<h3 className="scroll-m-20 text-2xl font-semibold mb-4 tracking-tight">
					B2B
				</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
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
								name="cname"
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
							<Database />
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}

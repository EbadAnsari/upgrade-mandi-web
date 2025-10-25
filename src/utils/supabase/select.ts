import { supabase } from "./client";

export function getAllConsumers() {
	return supabase.from("customer_details").select("*");
}

export function getAllOrdersByDate(startDate: Date, endDate: Date | null) {
	if (!endDate) endDate = new Date();

	return supabase
		.from("orders")
		.select("*")
		.gte("date", startDate)
		.lte("date", endDate);
}

export function getConsumerById(id: string) {
	return supabase.from("customer_details").select("*").eq("id", id);
}

export function getOrderById(id: string) {
	return supabase.from("orders").select("*").eq("id", id);
}

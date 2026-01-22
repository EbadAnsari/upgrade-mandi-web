import { nanoid } from "nanoid";
import { FilterId } from "./type";

export function generateFilterId(): FilterId {
	return nanoid(6);
}

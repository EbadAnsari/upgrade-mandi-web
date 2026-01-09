export function extractKeysFromEnum(enumObject: any) {
	return Object.keys(enumObject).map((key) => key);
}

export function extractValuesFromEnum(enumObject: any) {
	return Object.values(enumObject).map((value) => value) as string[];
}

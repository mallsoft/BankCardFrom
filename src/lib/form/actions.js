export function isInThePast(yy, mm) {
	const now = new Date(new Date().toISOString('en').slice(0, 7)); // only want YYYY-MM
	const check = new Date(`20${yy}-${mm}`); // assuming not (year 2100 or more :)

	return check < now;
}

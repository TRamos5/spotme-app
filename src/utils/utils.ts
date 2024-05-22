export const dataFormatter = (number: number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const getCurrentMonth = () => {
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const d = new Date();
	return month[d.getMonth()];
};

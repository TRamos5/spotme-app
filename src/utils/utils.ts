export const dataFormatter = (number: number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const months = [
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

export const getCurrentMonth = () => {
	const d = new Date();
	return months[d.getMonth()];
};

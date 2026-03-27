export const toNumberOrZero = (value: string) => {
	const parsed = Number(value);
	return Number.isNaN(parsed) ? 0 : parsed;
};

export const formatDateToString = (timestamp: number) => {
	const d = new Date(timestamp);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const isValidDateString = (dateStr: string) => {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (!regex.test(dateStr)) return false;
	const d = new Date(dateStr + 'T00:00:00');
	return !isNaN(d.getTime());
};

export const parseDateString = (dateStr: string) => {
	const d = new Date(dateStr + 'T00:00:00');
	return d.getTime();
};

export const calculateCaloriesFromMacros = (
	protein: number,
	carbs: number,
	fats: number
) => {
	return Math.round((protein * 4) + (carbs * 4) + (fats * 9));
};
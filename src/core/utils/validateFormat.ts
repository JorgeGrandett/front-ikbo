export const validateFormat = (text: any, regex: RegExp): boolean => {
	return regex.test(text);
};
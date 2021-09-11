const translateDate = (date: string): string => {
	let translated: string
	const dateObj = new Date(date)
	translated =
		String(dateObj.getFullYear()) +
		'/' +
		String(dateObj.getMonth() + 1) +
		'/' +
		dateObj.getDate() +
		' ' +
		String(dateObj.getHours()) +
		':' +
		String(dateObj.getMinutes()) +
		':' +
		String(dateObj.getSeconds())
	return translated
}
export { translateDate }

export const checkInternetConnection = () => {
	let message;
	if (window.navigator.onLine) {
		message = console.log(window.navigator.onLine);
	}
	return message;
};

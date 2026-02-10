const log = (message: string): void => {
	console.log(`[LOG]: ${message}`);
};

const logError = (errorMessage: string): void => {
	console.error(`[ERROR]: ${errorMessage}`);
};

export default log;
export { logError };

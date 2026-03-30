import App from "./app";

const appInstance = new App();

export const { app } = appInstance; // <-- export the Express app

const main = () => {
	appInstance.start();
};

main();

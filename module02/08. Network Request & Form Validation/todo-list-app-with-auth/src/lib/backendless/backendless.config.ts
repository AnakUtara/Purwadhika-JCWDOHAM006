import Backendless from "backendless";

const API_HOST = "https://api.backendless.com";
const APP_ID = "BC88BC3F-5A10-4ED8-829C-89F70D24A5AB";
const API_KEY = "A5E8EAD7-78C0-43E7-AD08-19575A210410";

export const initBackendless = () => {
	Backendless.serverURL = API_HOST;
	Backendless.initApp(APP_ID, API_KEY);
};

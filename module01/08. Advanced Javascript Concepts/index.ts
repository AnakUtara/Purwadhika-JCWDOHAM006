// console.log("Task 01");
// Task 02 akan dieksekusi setelah 3 detik
// Task 03 akan dieksekusi segera setelah Task 01
// setTimeout(() => console.log("Task 02"), 3000);
// console.log("Task 03");

import log, { logError } from "./logger.ts";
import { add, subtract } from "./math.ts";

// const calculator = (
// 	a: number,
// 	b: number,
// 	callback: (n: number) => number,
// ): number => {
// 	return callback(a + b);
// };

// const displayer = (display: boolean, n: number): number => {
// 	return display ? n : 0;
// };

// console.log(calculator(5, 10, (n: number) => n));
// console.log(calculator(10, 2, (n: number) => displayer(true, n)));

// underscore di parameter menandakan bahwa parameter tersebut tidak akan digunakan
const dataPromise = new Promise<string | null>((resolve, reject) => {
	// setTimeout untuk mensimulasikan proses asynchronous
	setTimeout(() => {
		resolve(null);
		// reject("Failed to load data");
	}, 3000);
});

// Contoh generic simple
// T adalah tipe data generic
// akan ditentukan saat memanggil interface ini
// sesuai dengan tipe data yang diharapkan masing-masing
interface ApiResponse<T> {
	data: T;
	status: number;
	error?: string;
}

// Contoh promise handling dengan then dan catch

// dataPromise
// 	.then((data) => {
// 		console.log("then called");
// 		return data;
// 	})
// 	.catch((error) => {
// 		console.log("catch called");
// 		return error;
// 	});

// Contoh promise handling dengan async dan await
let data: string | unknown = "Loading...";

const displayPromise = async () => {
	try {
		const result = await dataPromise;
		if (!result) throw new Error("No data available");
		data = result;
	} catch (error: Error | unknown) {
		console.error(
			"Error caught in async function:",
			error instanceof Error ? error.message : error,
		);
		data = error;
	}
	return data;
};

displayPromise();

console.log(data);
console.log("After promise");
setTimeout(() => console.log(data), 4000);

// const fetchUserData = async () => {
// 	try {
// 		const response = await fetch("http://jsonplaceholder.typicode.com/users");
// 		const data = await response.json();
// 		console.log(data[0]?.adasd);
// 	} catch (error) {
// 		console.error("Error fetching user data:", error);
// 	}
// };

// fetchUserData();

// JSON

const object = '{"name": "John", "age": 30, "city": "New York"}';
const parseObject = JSON.parse(object);
console.log(object);
console.log(parseObject.age);
const stringifiedObject = JSON.stringify(parseObject);
console.log(stringifiedObject);

// Module import dan export
// import selalu terletak di paling atas file
log(`This is a log message: ${add(2, 3)}`);
logError(`This is an error message: ${subtract(5, 10)}`);

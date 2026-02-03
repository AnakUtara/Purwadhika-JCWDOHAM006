// const strArray: string[] = ["apple", "banana", "cherry"];
// strArray.push("date");
// const lastIndex = strArray.length - 1;
// console.log(strArray[lastIndex]);
// console.log(strArray.length);
// const lastRemovedItem: string = strArray.pop()!;
// console.log(strArray);
// console.log(`Removed item: ${lastRemovedItem}`);
// strArray.unshift("avocado");
// console.log(strArray);
// const firstRemovedItem: string = strArray.shift()!;
// console.log(strArray);
// console.log(`Removed item: ${firstRemovedItem}`);
// strArray[1] = "blueberry";
// console.log(strArray);
// const strArray2: string[] = strArray;
// strArray2.splice(1, 1, "blackberry", "raspberry");
// console.log(strArray);
// console.log(strArray2);
// const slicedArray: string[] = strArray2.slice(0, 1);
// console.log(slicedArray);
// if (strArray.includes("banana")) {
// 	console.log("banana is found in the array");
// }

// const numbers: number[] = [10, 20, 30, 40, 50];
// for (const number of numbers) {
// 	console.log(number);
// }

// numbers.forEach((number: number, i: number) => {
// 	console.log(`Index ${i}: ${number}`);
// });

// console.log(numbers.toString());
// console.log(numbers.join(""));
// console.log(["A", "B", "C", "D"].join("").split(" "));

// const hundredthArr: number[] = numbers.map((number: number) => {
// 	return number * 10;
// });

// console.log(numbers);
// console.log(hundredthArr);
// console.log(numbers.find((n) => n > 20));
// console.log(numbers.filter((n) => n >= 20));
// console.log(numbers.reduce((acc, curr) => (acc += curr), 0));

// FUNCTIONS

greet();

function greet(name: string = "Guest") {
	console.log(`Hello, ${name}!`);
}

greet("Alice");
greet("Bob");

const greetings = greet();

console.log(greetings);

const add = (n1: number, n2: number): number => {
	return n1 + n2;
};

console.log(add(1, 1));
const sum = add(5, 10);
console.log(`Sum: ${sum}`);

const multiplyMany = (...numbers: number[]) => {
	return numbers.reduce((acc, curr) => (acc *= curr), 1);
};

console.log(multiplyMany(1, 2, 3, 4, 5, 6, 7, 8, 9));
console.log(multiplyMany(10, 20, 30));

const isEven = (num: number): boolean => num % 2 === 0;

console.log(`${isEven(5) ? "genap" : "ganjil"}`);

const stringManipulator = (
	strings: string[] = ["apple", "banana", "cherry"],
) => {
	strings.push("date", "elderberry", "blackberry");
	const uppercased = strings.map((str) => str.toUpperCase());
	strings.pop();
	return uppercased;
};

const registeredUsers: string[] = ["john", "jane", "doe"];
const registeredPasswords: string[] = ["john123", "jane123", "doe123"];

const signIn = (username: string, password: string) => {
	if (registeredUsers.includes(username)) {
		if (registeredPasswords[registeredUsers.indexOf(username)] === password) {
			console.log(`Welcome back, ${username}!`);
		}
	} else {
		console.log("Username or password is incorrect.");
	}
};

const signUp = (username: string, password: string) => {
	if (registeredUsers.includes(username)) {
		console.log("Username already taken.");
	} else {
		registeredUsers.push(username);
		registeredPasswords.push(password);
		console.log(`User ${username} successfully registered.`);
	}
};

signIn("john", "john123");
signIn("jane", "wrongpassword");
signIn("unknown", "nopassword");
signUp("alice", "alice123");
signUp("john", "newjohnpassword");
signIn("alice", "alice123");
console.log(registeredUsers, registeredPasswords);

// Closure

const createMultiplier = (factor: number): ((num: number) => number) => {
	return (num: number) => {
		return num * factor;
	};
};

const double = createMultiplier(2);
const triple = createMultiplier(3);

const p = triple(5);
console.log(p);
const r = double(5);
console.log(r);

const arrayMapper = (
	arr: unknown[],
	mapper: (item: unknown) => unknown,
): unknown[] => {
	const result: unknown[] = new Array();
	for (const item of arr) {
		result.push(mapper(item));
	}
	return result;
};

const mappedArray = arrayMapper(["1", "2", "3", "4", "5"], (item) => {
	return (item as number) + 10;
});

console.log(mappedArray);

const getMessage = (
	firstName: string,
): [() => string, (lastName?: string) => string] => {
	const sayHello = () => {
		return `Hello, ${firstName}!`;
	};

	const welcomeMessage = (lastName?: string) => {
		return `Welcome to our platform, ${firstName + " " + (lastName || "Smith")}.`;
	};

	return [sayHello, welcomeMessage];
};

// Tanpa destrukturisasi
const messages = getMessage("Alice");
const message = messages[0];
console.log(message());

// Dengan destrukturisasi
const [sayHello, welcomeMessage] = getMessage("Bob");
console.log(sayHello());
console.log(welcomeMessage("Johnson"));

// Spread Operator Array
const arr1: number[] = [1, 2, 3];
const arr2: number[] = [4, 5, 6];
let combinedArr: number[] = [-3, -2, -1, 0, ...arr1, ...arr2, 7, 8, 9];
combinedArr = [
	...combinedArr.filter((num) => num === Math.abs(num) && num !== 0),
];
combinedArr = [...combinedArr, 10, 11, 12];
console.log(combinedArr);

// Currying Function
const curriedAdd =
	(a: number) =>
	(b: number) =>
	(c: number): number => {
		return a + b + c;
	};

const addPhase1 = curriedAdd(2);
const addPhase2 = addPhase1(3);
const finalSum = addPhase2(5);
console.log(finalSum); // Output: 10

// Recursive Function
const recursiveFactorial = (n: number): number => {
	// Base Case
	if (n === 0 || n === 1) {
		return 1;
	}
	return n * recursiveFactorial(n - 1);
};

const factorialOf5 = recursiveFactorial(5);
/*
call pertama: recursiveFactorial(5)
-> return 5 * recursiveFactorial(4)

call kedua: recursiveFactorial(4)
-> return 4 * recursiveFactorial(3)

call ketiga: recursiveFactorial(3)
-> return 3 * recursiveFactorial(2)

call keempat: recursiveFactorial(2)
-> return 2 * recursiveFactorial(1)

call kelima (base case): recursiveFactorial(1)
-> return 1

Maka hasil akhirnya adalah:
5 * 4 * 3 * 2 * 1 = 120

Pemanggilan fungsi akan kembali dari call kelima ke 
call pertama dengan hasil akhir 120.
*/

console.log(`Faktorial dari 5 adalah ${factorialOf5}.`);

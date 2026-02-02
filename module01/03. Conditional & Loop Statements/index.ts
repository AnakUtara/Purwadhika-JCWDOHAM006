const age: number = 10;
const isLegible: boolean = age >= 17;
const almostLegible: boolean = age >= 13;
const hasID: boolean = true;

// if (isLegible) {
// 	console.log("Bisa bikin KTP.");
// } else if ((!isLegible && !almostLegible) || hasID) {
// 	console.log("Kecil2 udah punya KTP.");
// } else if (almostLegible || hasID) {
// 	console.log("Hampir bisa bikin KTP.");
// } else {
// 	console.log("Belum bisa bikin KTP.");
// }

const legibilityResult = isLegible
	? "Bisa bikin KTP."
	: almostLegible
		? "Hampir bisa bikin KTP."
		: "Belum bisa bikin KTP.";

console.log(legibilityResult);

const n: number = 11;
const isEven: boolean = n % 2 === 0;
// Contoh penggunaan ternary operator
const renderResultString: string = isEven ? "genap" : "ganjil";
console.log(`${n} adalah bilangan ${renderResultString}.`);

const grade: string = "F";

switch (grade) {
	case "A":
		console.log("Nilai Anda sangat baik.");
		break;
	case "B":
		console.log("Nilai Anda baik.");
		break;
	case "C":
		console.log("Nilai Anda cukup.");
		break;
	case "D":
		console.log("Nilai Anda kurang.");
		break;
	case "E":
		console.log("Nilai Anda sangat kurang.");
		break;
	default:
		console.log("Nilai tidak valid.");
}

let data: number | undefined;

if (!data) {
	console.log("Data tidak ada");
}

let nama = "Budi";
let user = nama && `${nama} adalah user yang terdaftar.`;
console.log(user);

// Contoh penggunaan loop

for (let i = 0; i < 3; i += 2) {
	console.log(`Perulangan ke-${i}`);
}

let j = 0;
// while (j < 3) {
// 	console.log(`While Perulangan ke-${j}`);
// 	j++;
// }

do {
	console.log(`Do While Perulangan ke-${j}`);
	j++;
} while (j < 0);

let sum: number = 0;

while (true) {
	sum += 1;
	console.log(`Current Sum: ${sum}`);
	if (sum >= 5) break;
}

for (let i = 1; i <= 5; i++) {
	console.log(`Looping number: ${i}`);
	if (i === 3) break;
}

for (let i = 1; i <= 5; i++) {
	// if (i === 3) continue;
	console.log(`Looping number: ${i}`);
}

const nFactor: number = 6;
let result: number = 1;

for (let i = 1; i <= nFactor; i++) {
	result *= i;
	console.log(`Factorial of ${nFactor} = ${result}`);
}

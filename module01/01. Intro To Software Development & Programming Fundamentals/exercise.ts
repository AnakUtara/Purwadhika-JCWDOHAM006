const l: number = 5;
const w: number = 3;
const area: number = l * w;
console.log("Area of rectangle is: " + area);

const perimeter: number = 2 * (l + w);
console.log("Perimeter of rectangle is: " + perimeter);

const r: number = 5;
const pi: number = Math.PI;
const diameter: number = 2 * r;
console.log("Diameter of circle is: " + diameter);

const circumference: number = 2 * pi * r;
console.log("Circumference of circle is: " + circumference);

const a: number = 80;
const b: number = 65;
const c: number = 180 - (a + b);
console.log("The third angle of the triangle is: " + c);

const days: number = 400;
const years: number = Math.floor(days / 365);
const remainingDays: number = days % 365;
const months: number = Math.floor(remainingDays / 30);
console.log(
	days +
		" days is approximately " +
		years +
		" years, " +
		months +
		" months, and " +
		(remainingDays % 30) +
		" days.",
);

const date1: Date = new Date("2023-01-01");
const date2: Date = new Date("2023-01-02");
const timeDiff: number = Math.abs(date2.getTime() - date1.getTime());
const diffDays: number = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log("Difference between the two dates is: " + diffDays + " days.");

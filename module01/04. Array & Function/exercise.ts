function createTriangle(height: number) {
	let lastValue: number = 1;
	let result: string = "";
	for (let i = 1; i <= height; i++) {
		if (i === 1) {
			result += `0${i}\n`;
			lastValue++;
		} else {
			for (let j = 1; j <= i; j++) {
				result += `${lastValue.toString().padStart(2, "0")} `;
				lastValue++;
			}
			result += `\n`;
		}
	}
	return result;
}

console.log(createTriangle(4));

const fizzBuzz = (n: number) => {
	for (let i = 1; i <= n; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			console.log("FizzBuzz");
		} else if (i % 3 === 0) {
			console.log("Fizz");
		} else if (i % 5 === 0) {
			console.log("Buzz");
		} else {
			console.log(i);
		}
	}
};

fizzBuzz(6);

const getBMI = (weight: number, height: number): string => {
	const bmi: number = weight / (height * height);
	if (bmi < 18.5) {
		return "Underweight";
	} else if (bmi >= 18.5 && bmi < 24.9) {
		return "Ideal weight";
	} else if (bmi >= 25 && bmi < 29.9) {
		return "Overweight";
	} else if (bmi >= 30 && bmi < 34.9) {
		return "Very Overweight";
	} else {
		return "Obesity";
	}
};

console.log(getBMI(70, 1.75));
console.log(getBMI(50, 1.6));
console.log(getBMI(90, 1.8));
console.log(getBMI(110, 1.7));

const getEvenNumbers = (arr: number[]): number[] => {
	return arr.filter((num) => num % 2 === 0);
};

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(getEvenNumbers([11, 13, 15, 17]));
console.log(getEvenNumbers([2, 4, 6, 8, 10]));

const stringSplitter = (str: string, delimiter: string = " "): string[] => {
	return str.split(delimiter);
};

console.log(stringSplitter("Hello World! This is TypeScript."));
console.log(stringSplitter("apple,banana,cherry", ","));
console.log(stringSplitter("one-two-three-four", "-"));

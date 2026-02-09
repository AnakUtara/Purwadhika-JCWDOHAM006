/*
Given an array nums of size n, return the majority element. 
The majority element is the element that appears more than ⌊n / 2⌋ times. 
You may assume that the majority element always exists in the array.
*/

const findMajorityElement = (nums: number[]): number => {
	const countMap: { [key: number]: number } = {};
	const majorityCount = Math.floor(nums.length / 2);
	// nums.length / 2 dibulatkan ke bawah untuk menentukan jumlah mayoritas
	// dari mana jumlah mayoritas dihitung? Dari panjang array dibagi 2
	// mengapa dari panjang array dibagi 2? Karena mayoritas didefinisikan sebagai elemen yang muncul lebih dari n/2 kali
	for (const num of nums) {
		countMap[num] = (countMap[num] || 0) + 1;
		if (countMap[num] > majorityCount) {
			return num;
			// Kembalikan elemen mayoritas segera setelah ditemukan
		}
	}
	return -1; // Kalau majority element sudah ditemukan, ini tidak akan pernah terjadi
};

console.log(findMajorityElement([2, 2, 1, 1, 2, 2]));

/*
Create a function to convert roman numeral to integer.
*/

const romanToInt = (s: string): number => {
	const romanMap: { [key: string]: number } = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};

	let total = 0;
	let prevValue = 0;

	// iterasi dimulai dari akhir string supaya lebih mudah untuk menghitung nilai dari angka terkecil ke terbesar
	for (let i in s.split("").reverse()) {
		const currentValue = romanMap[s[i]];
		// guard untuk memastikan bila sebelum V atau X ada I, maka dikurangi
		if (currentValue < prevValue) {
			total -= currentValue;
		} else {
			total += currentValue;
		}
		prevValue = currentValue;
	}

	return total;
};

console.log(romanToInt("MCMXCIV"));

/*
Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it 
*/

const generatePascalTriangle = (numRows: number): number[][] => {
	const result: number[][] = [];
	for (let row = 0; row < numRows; row++) {
		result[row] = [];
		// ketika ada nested loop, nested loop tersebut akan dijalankan sampai selesai sebelum melanjutkan ke iterasi berikutnya dari loop luar
		for (let col = 0; col <= row; col++) {
			if (col === 0 || col === row) {
				result[row][col] = 1; // Setiap baris dimulai dan diakhiri dengan 1
			} else {
				result[row][col] = result[row - 1][col - 1] + result[row - 1][col];
				// Setiap elemen adalah jumlah dari dua elemen di atasnya
			}
		}
	}
	return result;
};

console.log(generatePascalTriangle(5));

/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0. 
*/

const maxProfit = (prices: number[]): number => {
	let minPrice = Infinity;
	let maxProfit = 0;
	for (const price of prices) {
		// di awal iterasi minPrice di-set ke Infinity supaya harga pertama di array pasti lebih kecil
		// jika harga pertama adalah harga tertinggi dia tetap tidak akan jadi pilihan beli
		// karena tujuan kita adalah mencari profit maksimal dengan membeli di harga terendah
		// jadi kita perlu memastikan minPrice selalu berisi harga terendah sejauh ini
		// di iterasi berikutnya minPrice akan di-update bila ada harga yang lebih rendah
		// sehingga pada akhirnya minPrice akan berisi harga terendah dari seluruh array
		if (price < minPrice) {
			minPrice = price; // Update harga minimum jika harga saat ini lebih rendah
		} else if (price - minPrice > maxProfit) {
			maxProfit = price - minPrice; // Hitung profit dan update jika lebih besar dari maxProfit saat ini
		}
	}
	return maxProfit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));

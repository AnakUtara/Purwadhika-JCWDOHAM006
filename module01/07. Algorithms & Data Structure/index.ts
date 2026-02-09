const binarySearch = (
	arr: number[],
	l: number,
	r: number,
	searchTarget: number,
): number => {
	if (r >= l) {
		// mencari index tengah di array input
		let mid = l + Math.floor((r - l) / 2);
		console.log("middle index: ", mid);

		if (arr[mid] === searchTarget) {
			console.log("langsung ditemukan");
			return mid;
		}

		if (searchTarget < arr[mid]) {
			console.log("cari ke kiri");
			return binarySearch(arr, l, mid - 1, searchTarget);
		}

		console.log("cari ke kanan");
		return binarySearch(arr, mid + 1, r, searchTarget);
	}
	return -1; // return -1 jika elemen tidak ditemukan
};

const arr = [2, 3, 4, 10, 40];
console.log("Hasil binary search: ", binarySearch(arr, 0, arr.length - 1, 10));

const bubbleSort = (arr: number[]): number[] => {
	for (let i = 0; i < arr.length - 1; i++) {
		console.log("iterasi ke-" + i);
		for (let j = 0; j < arr.length - i - 1; j++) {
			console.log(
				"cek iterasi ke-" +
					j +
					", apakah nilainya lebih besar dari nilai setelahnya",
			);
			if (arr[j] > arr[j + 1]) {
				console.log(`lakukan perpindahan nilai dari ${arr[j]} & ${arr[j + 1]}`);

				// swap arr[j] dan arr[j + 1]
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
};

console.log(bubbleSort([5, 3, 8, 4, 6]));

// Hash Map

// const userRoles = new Map<number, string>();
// userRoles.set(101, "Admin");
// userRoles.set(102, "Editor");
// userRoles.set(103, "Subscriber");

// const admin = userRoles.get(101);
// console.log("Role user dengan ID 101 adalah: ", admin);
// const isEditor = userRoles.has(102);
// console.log("Apakah user dengan ID 102 adalah Editor? ", isEditor);

// userRoles.delete(103);
// console.log("Daftar user roles setelah menghapus ID 103: ", userRoles);

const userRoles: { [key: number]: string } = {};
userRoles[101] = "Admin";
userRoles[102] = "Editor";
userRoles[103] = "Subscriber";

const admin = userRoles[101];
console.log("Role user dengan ID 101 adalah: ", admin);
const isEditor = 102 in userRoles;
console.log("Apakah user dengan ID 102 adalah Editor? ", isEditor);

delete userRoles[103];
console.log("Daftar user roles setelah menghapus ID 103: ", userRoles);
//#endregion

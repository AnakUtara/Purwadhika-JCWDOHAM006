//#region Intro To Object

const car: {
	brand: string;
	price?: number;
	model: string;
	changeCarBrand: (newBrand: string) => void;
} = {
	brand: "Denza",
	price: 250000,
	model: "EV",
	changeCarBrand(newBrand: string) {
		this.brand = newBrand;
	},
};

car.changeCarBrand("Tesla");
car.brand = "Mio";

// Tambah properti secara dinamis (tidak direkomendasikan untuk penggunaan di dunia nyata & TypeScript)
(car as any).color = "red";

// Hapus properti dengan operator delete (hanya bisa dilakukan kepada properti yang opsional)
delete car.price;

// Iterasi properti dengan for...in
for (let key in car) {
	console.log(`${key}: ${car[key as keyof typeof car]}`);
}

console.log(car.brand);

// Interface sebagai bagan objek
interface IUser {
	name: string;
	address: {
		street: string;
		city: string;
		country: string;
	};
	greet?: () => void;
}

const user: IUser = {
	name: "Alice",
	address: {
		street: "123 Main St",
		city: "Wonderland",
		country: "Fictionland",
	},
	greet() {
		console.log(`Hello, my name is ${user.name}`);
	},
};

const user2: IUser = {
	name: "Budi",
	address: {
		street: "456 Side St",
		city: "Jakarta",
		country: "Indonesia",
	},
	greet() {
		console.log(`Hello, my name is ${this.name}`);
	},
};

user.greet?.();
user2.greet?.();

console.log(Object.entries(user));

const fusion: IUser = { ...user, ...user2 };
const user1Edit: IUser = {
	...user,
	name: "Charlie",
	address: { ...user.address, city: "New City" },
};

console.log(user);

console.log(user1Edit);

console.log(fusion);

console.log(user.address.city);

console.log([...Object.keys(user), ...Object.keys(user.address)]);

//#endregion

//#region Destructuring & Spread Operator
const user01 = user;
// Membuat salinan terpisah menggunakan spread operator (semi-deep copy)
const user02 = { ...user };
user01.name = "Bob";
user02.name = "Charlie";
console.log(user.name, user02.name);

let nama = "David";
let anotherNama = nama;
nama = "Eve";
console.log(nama, anotherNama);

// Destrukturisasi objek yang bersarang
const {
	name,
	address: { street },
} = user;
console.log(name, street);

// Menggunakan destrukturisasi untuk menukar/mengisi nilai dengan multiple variable declaration
let a, b;
[a, b] = [10, 20];
let c, d;
({ c, d } = { c: 30, d: 40 });
console.log(a, b);
console.log(c, d);

// Destrukturisasi array
const functionArray = [() => 1, () => 2, () => 3];
const [f2] = functionArray;
console.log(f2?.());

// Komposisi fungsi dan penggunaan objek sebagai enkapsulasi return value
const arraySorters = () => {
	const sortNumber = (arr: number[]): number[] => {
		return arr.sort((a, b) => a - b);
	};
	const sortString = (arr: string[]): string[] => {
		return arr.sort();
	};
	return { sortNumber, sortString };
};

const { sortNumber, sortString } = arraySorters();

console.log(sortNumber([5, 3, 8, 1, 2]));
console.log(sortString(["banana", "apple", "cherry", "date"]));

//#endregion

//#region Types & Interfaces

// Contoh pewarisan interface
interface IVector2 {
	x: number;
	y: number;
}

interface IVector3 extends IVector2 {
	z: number;
}

const playerPosition3D: IVector3 = {
	x: 10,
	y: 20,
	z: 30,
};

const playerPosition2D: IVector2 = {
	x: 5,
	y: 15,
};

// Type alias dengan intersection types
// INFO: Type alias tidak bisa diwariskan seperti interface, tetapi bisa menggabungkan beberapa tipe menggunakan intersection (&)
// interface bisa mendapatkan pewarisan dari type alias dengan extends
type TVector2 = {
	x: number;
	y: number;
};

type TVector3 = TVector2 & {
	z: number;
};

interface IAdvancedVector3 extends TVector3 {
	magnitude: () => number;
}

const enemyPosition3D: TVector3 = {
	x: 7,
	y: 14,
	z: 21,
};

const enemyPosition2D: TVector2 = {
	x: 3,
	y: 6,
};

//#endregion

//#region Classes & Object Oriented Programming

// Interface untuk mendefinisikan kontrak publik sebuah kelas
interface IBaseStats {
	takeDamage: (damage: number) => void;
	heal: (amount: number) => void;
	attack: (target: Player, damage: number) => void;
}

// Kelas abstrak sebagai blueprint untuk kelas turunan dan tidak bisa diinstansiasi langsung
abstract class BaseCharacter {
	// access modifier protected membuat properti hanya bisa diakses di kelas turunan
	protected name: string;
	protected health: number;
	protected job: string;
	constructor(name: string, health: number, job: string) {
		this.name = name;
		this.job = job;
		if (health >= 100) {
			this.health = 100;
			return;
		}
		this.health = health;
	}
	displayStats() {
		console.log(`Name: ${this.name}, Health: ${this.health}, Job: ${this.job}`);
	}
	get getName(): string {
		return this.name;
	}
	set setName(newName: string) {
		this.name = newName;
	}
}

// Pewarisan dan implementasi interface
class Player extends BaseCharacter implements IBaseStats {
	// secara default properti dan method di kelas adalah public
	magicPower: number;
	constructor(
		name: string,
		health: number,
		job: string,
		magicPower: number = 50,
	) {
		super(name, health, job);
		this.magicPower = magicPower;
	}
	takeDamage(damage: number): void {
		this.health -= damage;
		if (this.health < 0) {
			this.health = 0;
		}
	}
	heal(amount: number): void {
		this.health += amount;
		if (this.health > 100) {
			this.health = 100;
		}
	}
	attack(target: Player, damage: number): void {
		console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);
		target.takeDamage(damage);
	}
}

class Enemy extends BaseCharacter implements IBaseStats {
	takeDamage(damage: number): void {
		this.health -= damage;
		if (this.health < 0) {
			this.health = 0;
		}
	}
	heal(amount: number): void {
		this.health += amount;
		if (this.health > 100) {
			this.health = 100;
		}
	}
	attack(target: Player, damage: number): void {
		console.log(`${this.name} attacks ${target.getName} for ${damage} damage.`);
		target.takeDamage(damage);
	}
	static createEnemy(name: string, health: number, job: string): Enemy {
		return new Enemy(name, health, job);
	}
}

const player1 = new Player("Archer", 90, "Ranger");
const player2 = new Player("Warrior", 120, "Fighter");

const enemy1 = Enemy.createEnemy("Goblin", 80, "Monster");

player1.displayStats();
player2.displayStats();
enemy1.displayStats();

// Contoh class dengan static method dan properti sebagai utility bundler
class StringFormatters {
	// static adalah modifier yang membuat method atau properti bisa diakses tanpa perlu menginstansiasi kelas terlebih dahulu
	static capitalizeFirstLetter(str: string): string {
		if (str.length === 0) return str;
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static toCamelCase(str: string): string {
		return str
			.toLowerCase()
			.split(" ")
			.map((word, index) =>
				index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
			)
			.join("");
	}
}

console.log(StringFormatters.capitalizeFirstLetter("string"));
console.log(StringFormatters.toCamelCase("Tut Wuri Handayani"));

class Animal {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	makeSound(): void {
		console.log("Some generic animal sound");
	}
}

class Dog extends Animal {
	breed: string;
	// biasanya di kelas turunan harus memanggil super di constructor terlebih dahulu
	// sebelum mengakses this
	// constructor di kelas turunan wajib memanggil super
	// jika kelas turunan tidak memiliki constructor, maka constructor kelas induk akan dipanggil secara otomatis
	constructor(name: string, breed: string) {
		super(name);
		this.breed = breed;
	}
	// Method overriding
	// ketika memanggil super impelementasi dari kelas induk akan dipanggil terlebih dahulu
	// atau belakangan tergantung posisi pemanggilan super
	// pemanggilan super bersifat opsional
	makeSound(): void {
		super.makeSound();
		console.log("Woof! Woof!");
	}
}

const myDog = new Dog("Buddy", "Golden Retriever");

console.log(`Name: ${myDog.name} | Breed: ${myDog.breed}`);

myDog.makeSound();

//#endregion

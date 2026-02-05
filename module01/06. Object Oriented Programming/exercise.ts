// Create function to calculate array of student data

interface IStudentData {
	name: string;
	email: string;
	age: Date;
	score: number;
}

interface IStudentStatsResults {
	highest: number;
	lowest: number;
	average: number;
}

function calcMinMaxAvgAgeAndScore(students: IStudentData[]): {
	score: IStudentStatsResults;
	age: IStudentStatsResults;
} {
	const scores = students.map(({ score }: IStudentData) => score);
	const ages = students.map(
		({ age }: IStudentData) => new Date().getFullYear() - age.getFullYear(),
	);
	return {
		score: {
			highest: Math.max(...scores),
			lowest: Math.min(...scores),
			average: scores.reduce((acc, n) => acc + n, 0) / scores.length,
		},
		age: {
			highest: Math.max(...ages),
			lowest: Math.min(...ages),
			average: Math.floor(ages.reduce((acc, n) => acc + n, 0) / ages.length),
		},
	};
}

const studentsData: IStudentData[] = [
	{
		name: "Alice",
		email: "alice@example.com",
		age: new Date("2000-05-15"),
		score: 85,
	},
	{
		name: "Bob",
		email: "bob@example.com",
		age: new Date("1998-10-22"),
		score: 92,
	},
	{
		name: "Charlie",
		email: "charlie@example.com",
		age: new Date("2001-03-30"),
		score: 78,
	},
];

console.log(calcMinMaxAvgAgeAndScore(studentsData));

// Create a program to create transaction

// Perhatikan bahwa class bisa menjadi tipe dari sebuah objek juga

class Product {
	private name: string;
	private price: number;
	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
	get data() {
		return {
			name: this.name,
			price: this.price,
		};
	}
}

const product1 = new Product("Laptop", 1500);
const product2 = new Product("Smartphone", 800);
const product3 = new Product("Tablet", 600);

// Cek data produk untuk debugging
console.log("Product1: ", product1.data);
console.log("Product2: ", product2.data);
console.log("Product3: ", product3.data);

class Transaction {
	private total: number = 0;
	// properti data diambil dari getter pada class Product
	// lalu di-intersect dengan properti qty untuk menyimpan jumlah produk yang dibeli
	// sehingga concern produk di class Transaction bisa berbeda dengan class Product
	// class Product untuk mendefinisikan produk secara umum
	// sedangkan class Transaction untuk mendefinisikan produk yang dibeli beserta jumlahnya
	private products: (Product["data"] & { qty: number })[] = [];
	get getCart() {
		return this.products;
	}
	get showTotal(): number {
		return this.total;
	}
	addToCart(product: Product, qty: number): void {
		this.products = [...this.products, { ...product.data, qty }];
		this.total = this.products.reduce((acc, { price, qty }) => {
			return acc + price * qty;
		}, 0);
	}
	checkout(): void {
		console.log("Checkout Summary:");
		this.products.forEach(({ name, price, qty }) => {
			console.log(
				`${name} - Quantity: ${qty}, Unit Price: $${price}, Subtotal: $${price * qty}`,
			);
		});
		console.log(`Total Amount: $${this.total}`);
	}
}

const transaction1 = new Transaction();

transaction1.addToCart(product1, 1);
transaction1.addToCart(product2, 2);
transaction1.addToCart(product3, 3);
// perhatikan bahwa getter di-treat sebagai properti, bukan method
console.log("Cart contents: ", transaction1.getCart);
transaction1.checkout();

export const metadata = {
	title: "About Us",
	description: "Learn more about our company and mission",
};

export default function AboutUs() {
	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-16 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl font-bold text-gray-900 mb-8">About Us</h1>

				<section className="bg-white rounded-lg shadow-lg p-8 mb-8">
					<h2 className="text-3xl font-semibold text-gray-800 mb-4">
						Our Mission
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						We are dedicated to providing exceptional web development solutions
						that empower businesses to succeed in the digital age. Our team
						combines cutting-edge technology with creative problem-solving.
					</p>
				</section>

				<section className="bg-white rounded-lg shadow-lg p-8 mb-8">
					<h2 className="text-3xl font-semibold text-gray-800 mb-4">
						Who We Are
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						With years of experience in web development, we specialize in modern
						technologies like Next.js, React, and TypeScript. Our passion is
						building fast, scalable, and user-friendly applications.
					</p>
				</section>

				<section className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-3xl font-semibold text-gray-800 mb-4">
						Our Values
					</h2>
					<ul className="text-gray-700 space-y-3">
						<li className="flex items-start">
							<span className="text-indigo-600 font-bold mr-3">✓</span>
							<span>Innovation and continuous improvement</span>
						</li>
						<li className="flex items-start">
							<span className="text-indigo-600 font-bold mr-3">✓</span>
							<span>Quality and attention to detail</span>
						</li>
						<li className="flex items-start">
							<span className="text-indigo-600 font-bold mr-3">✓</span>
							<span>Customer satisfaction and collaboration</span>
						</li>
						<li className="flex items-start">
							<span className="text-indigo-600 font-bold mr-3">✓</span>
							<span>Transparency and accountability</span>
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
}

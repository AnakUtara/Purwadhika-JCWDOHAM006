import "./App.css";
import Navbar from "./components/Navbar";

import AboutSection from "./components/sections/About";
import HeroSection from "./components/sections/Hero";

function App() {
	return (
		<>
			<Navbar />
			<HeroSection />
			<AboutSection />
		</>
	);
}

export default App;

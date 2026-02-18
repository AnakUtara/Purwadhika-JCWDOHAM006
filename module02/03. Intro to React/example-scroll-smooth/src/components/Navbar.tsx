const Navbar = () => (
	<nav
		style={{
			display: "flex",
			alignItems: "center",
			padding: "16px",
			gap: "16px",
			backgroundColor: "#f8f9fa",
			position: "sticky",
			top: 0,
			zIndex: 1000,
		}}
	>
		<a href="#hero">Home</a>
		<a href="#about">About</a>
	</nav>
);

export default Navbar;

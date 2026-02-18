import type { CSSProperties } from "react";
import { NavLink } from "react-router";

const navbarStyles: CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "16px",
	backgroundColor: "#f8f9fa",
};

const Navbar = () => {
	return (
		<nav style={navbarStyles}>
			{/*NavLink adalah komponen yang diberikan oleh React Router untuk membuat link navigasi yang dapat mendeteksi apakah link tersebut aktif atau tidak */}
			<NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
				Home
			</NavLink>
			<NavLink
				to="/about-us"
				className={({ isActive }) => (isActive ? "active" : "")}
			>
				About Us
			</NavLink>
		</nav>
	);
};

export default Navbar;

import SectionContainer from "../layout/SectionContainer";

const AboutSection = () => (
	<SectionContainer id="about">
		<div
			style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32 }}
		>
			<h2>About Me</h2>
			<p>
				I'm a passionate fullstack web developer with experience in building
				modern web applications using React, Node.js, and MongoDB. I enjoy
				creating user-friendly interfaces and writing clean, maintainable code.
			</p>
		</div>
	</SectionContainer>
);

export default AboutSection;

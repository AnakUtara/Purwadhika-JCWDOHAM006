import SectionContainer from "../layout/SectionContainer";

const HeroSection = () => (
	<SectionContainer id="hero">
		<div className="heroContent">
			<div>
				<h1>Hi, I'm [Your Name]</h1>
				<p>Fullstack Web Developer</p>
			</div>
			<img
				style={{
					maxWidth: 400,
					borderRadius: "5%",
				}}
				src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
				alt="my profile picture"
			/>
		</div>
	</SectionContainer>
);

export default HeroSection;

import type { ReactNode } from "react";

type Props = {
	id: string;
	children: ReactNode;
};

const SectionContainer = ({ id, children }: Props) => (
	<section
		id={id}
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		}}
	>
		{children}
	</section>
);

export default SectionContainer;

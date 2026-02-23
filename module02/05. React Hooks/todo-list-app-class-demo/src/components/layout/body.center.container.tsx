import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};
const BodyCenteredContainer = ({ children }: Props) => (
	<div className="mx-auto container">{children}</div>
);

export default BodyCenteredContainer;

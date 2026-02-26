import type { ReactNode } from "react";

const CenterBodyContainer = ({ children }: { children: ReactNode }) => {
	return <div className="mx-auto container p-8">{children}</div>;
};

export default CenterBodyContainer;

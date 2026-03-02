import React from "react";

interface SectionHeaderProps {
	label: string;
	title?: string;
	className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
	label,
	title,
	className = "",
}) => {
	return (
		<div className={`mb-16 ${className}`}>
			<h2 className="text-sm uppercase tracking-[0.4em] mb-4 opacity-60">
				{label}
			</h2>
			{title && (
				<h3 className="text-5xl font-bold tracking-tighter">{title}</h3>
			)}
		</div>
	);
};

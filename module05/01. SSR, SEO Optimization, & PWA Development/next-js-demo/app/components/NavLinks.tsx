"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/about-us", label: "About Us" },
	{ href: "/posts", label: "Posts" },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<div className="flex gap-6">
			{links.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className={
						pathname === href
							? "text-white font-semibold underline underline-offset-4"
							: "text-gray-300 hover:text-white"
					}
				>
					{label}
				</Link>
			))}
		</div>
	);
}

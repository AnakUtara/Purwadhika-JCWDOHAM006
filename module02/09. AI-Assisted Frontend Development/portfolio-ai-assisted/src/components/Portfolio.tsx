import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "../constants";
import { SectionHeader } from "./SectionHeader";

const projects = [
	{
		title: "Halo Digital Agency",
		category: "Web Design / 2024",
		img: IMAGES.project1,
		offset: false,
	},
	{
		title: "Vektronics E-commerce",
		category: "App / UI Design",
		img: IMAGES.project2,
		offset: true,
	},
	{
		title: "Creative Minds",
		category: "Branding / 2023",
		img: IMAGES.project3,
		offset: false,
	},
];

export const Portfolio: React.FC = () => {
	return (
		<section id="work" className="py-24 md:py-48 px-6 md:px-12">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-end mb-16">
					<SectionHeader
						label="Latest Works"
						title="Portfolio"
						className="mb-0"
					/>
					<a
						href="#"
						className="text-sm uppercase tracking-widest font-bold border-b-2 border-primary dark:border-white pb-1"
					>
						View All
					</a>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className={`group cursor-pointer ${project.offset ? "md:mt-12" : ""}`}
						>
							<div className="overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-6 aspect-[4/5]">
								<img
									src={project.img}
									alt={project.title}
									className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
									referrerPolicy="no-referrer"
								/>
							</div>
							<div className="flex justify-between items-start">
								<div>
									<h4 className="text-xl font-bold mb-1 uppercase tracking-tight">
										{project.title}
									</h4>
									<p className="text-sm opacity-60 uppercase tracking-widest">
										{project.category}
									</p>
								</div>
								<ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

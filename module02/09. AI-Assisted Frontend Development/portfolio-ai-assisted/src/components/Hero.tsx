import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { IMAGES } from "../constants";

export const Hero: React.FC = () => {
	return (
		<section className="relative min-h-screen flex items-end pt-32 px-6 md:px-12 pb-12 overflow-hidden">
			<div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="lg:col-span-8"
				>
					<span className="block text-sm uppercase tracking-[0.3em] mb-4 opacity-60">
						UI/UX Designer & Art Director
					</span>
					<h1 className="hero-title font-bold mb-8">Hello.</h1>
					<div className="flex items-center space-x-8 max-w-md">
						<div className="w-12 h-[1px] bg-primary dark:bg-white"></div>
						<p className="text-lg leading-relaxed opacity-80">
							Crafting digital experiences that balance aesthetics with
							functional precision. Based in Berlin, working globally.
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="lg:col-span-4 flex justify-end"
				>
					<div className="text-right">
						<div className="mb-12">
							<span className="block text-4xl font-bold italic font-serif">
								200+
							</span>
							<span className="text-xs uppercase tracking-widest opacity-60">
								Projects Completed
							</span>
						</div>
						<div className="mb-12">
							<span className="block text-4xl font-bold italic font-serif">
								50+
							</span>
							<span className="text-xs uppercase tracking-widest opacity-60">
								Happy Clients
							</span>
						</div>
						<a
							href="#work"
							className="inline-flex items-center space-x-4 group"
						>
							<span className="text-sm uppercase tracking-widest font-bold">
								Scroll Down
							</span>
							<ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
						</a>
					</div>
				</motion.div>
			</div>

			<div className="absolute top-0 right-0 w-full lg:w-3/5 h-full -z-10 grayscale opacity-40 lg:opacity-100">
				<img
					src={IMAGES.portrait}
					alt="Portrait of the designer"
					className="w-full h-full object-cover object-center"
					referrerPolicy="no-referrer"
				/>
			</div>
		</section>
	);
};

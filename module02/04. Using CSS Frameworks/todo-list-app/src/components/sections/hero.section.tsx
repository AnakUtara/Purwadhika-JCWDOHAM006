import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
	return (
		<header className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 max-w-6xl mx-auto w-full">
				{/* Navigation indicator */}
				<nav className="mb-12 sm:mb-16 lg:mb-20 flex gap-8 text-sm font-medium text-muted-foreground">
					<a href="#about" className="hover:text-cyan-400 transition-colors">
						ABOUT
					</a>
					<a href="#projects" className="hover:text-cyan-400 transition-colors">
						PROJECTS
					</a>
					<a href="#contact" className="hover:text-cyan-400 transition-colors">
						CONTACT
					</a>
				</nav>

				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left content */}
					<div className="flex flex-col gap-8">
						<div className="space-y-4">
							<div className="text-cyan-400 text-sm font-medium tracking-wider">
								Welcome to my portfolio
							</div>
							<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
								Crafting Digital
								<span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
									{" "}
									Experiences
								</span>
							</h1>
						</div>

						<p className="text-lg text-muted-foreground leading-relaxed max-w-md">
							I'm a full-stack developer passionate about creating beautiful,
							performant web applications that solve real problems.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 pt-4">
							<a
								href="#projects"
								className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
							>
								View My Work
								<ArrowRight className="w-4 h-4" />
							</a>
							<a
								href="#contact"
								className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-foreground hover:text-cyan-400 font-semibold rounded-lg transition-colors"
							>
								Get in Touch
							</a>
						</div>

						{/* Social Links */}
						<div className="flex gap-6 pt-4">
							<a
								href="#"
								className="text-muted-foreground hover:text-cyan-400 transition-colors"
							>
								<Github className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-cyan-400 transition-colors"
							>
								<Linkedin className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-muted-foreground hover:text-cyan-400 transition-colors"
							>
								<Mail className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Right side - Code block showcase */}
					<div className="hidden lg:flex items-center justify-center">
						<div className="relative w-full max-w-md">
							{/* Glowing card */}
							<div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-2xl"></div>

							{/* Code block */}
							<div className="relative bg-slate-900/80 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
								<div className="space-y-3 font-mono text-sm">
									<div className="text-blue-400">const portfolio = {"{"}</div>
									<div className="pl-4">
										<div className="text-cyan-300">
											developer<span className="text-slate-400">:</span>{" "}
											<span className="text-green-400">'Full-stack'</span>,
										</div>
										<div className="text-cyan-300">
											passionate<span className="text-slate-400">:</span>{" "}
											<span className="text-amber-300">true</span>,
										</div>
										<div className="text-cyan-300">
											skills<span className="text-slate-400">:</span>{" "}
											<span className="text-green-400">[</span>
										</div>
										<div className="pl-4">
											<div className="text-green-400">
												'React', 'Next.js', 'TypeScript', 'Tailwind'
											</div>
										</div>
										<div className="text-green-400">]</div>
									</div>
									<div className="text-blue-400">{"}"}</div>
								</div>
							</div>

							{/* Decorative dots */}
							<div className="absolute -top-8 -right-8 w-16 h-16 border border-cyan-500/30 rounded-lg"></div>
							<div className="absolute -bottom-8 -left-8 w-16 h-16 border border-blue-500/30 rounded-lg"></div>
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
					<div className="text-center">
						<div className="text-xs text-muted-foreground mb-2">
							Scroll to explore
						</div>
						<svg
							className="w-4 h-4 mx-auto text-cyan-400"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</div>
				</div>
			</div>
		</header>
	);
}

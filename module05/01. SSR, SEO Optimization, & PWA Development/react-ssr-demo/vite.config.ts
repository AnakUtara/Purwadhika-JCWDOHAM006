import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: { enabled: true },
			manifest: {
				name: "Vite React SSR Demo",
				short_name: "SSR Demo",
				description: "A Vite React SSR demo with PWA support",
				theme_color: "#646cff",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/favicon.svg",
						sizes: "any",
						type: "image/svg+xml",
					},
				],
			},
		}),
	],
});

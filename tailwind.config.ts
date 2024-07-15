import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import { type Config } from "tailwindcss";

const config: Config = {
	content: ["./apps/ui/**/*.{ts,tsx}"],
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
};

export default config;
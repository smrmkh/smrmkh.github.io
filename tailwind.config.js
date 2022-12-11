module.exports = {
	content: ["./public/**/*.html", "./src/js/theme.js"],
	// darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#ffe000",
			},
		},
	},
	plugins: [
		// require("@tailwindcss/forms"),
		// require("@tailwindcss/typography"),
		// require("@tailwindcss/aspect-ratio"),
	],
};

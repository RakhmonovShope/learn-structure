const { REACT_APP_API_ROOT } = process.env;

const config = {
	API_ROOT: REACT_APP_API_ROOT,
	DEFAULT_LANGUAGE: "uz",
	API_LANGUAGES: [
		{ id: 1, title: "Русский", code: "ru" },
		{ id: 3, title: "Ўзбекча", code: "uz" }
	]
};

export default config;

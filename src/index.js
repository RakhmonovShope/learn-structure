import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import Routes from "./routes.js";

import { i18n, api } from "./services";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { configure as configureStore } from "store";

const store = configureStore();
store.subscribe(() => {
	api.subscribe(store);
});
console.log(process.env);
const render = Component => {
	ReactDOM.render(
		<Provider {...{ store }}>
			<I18nextProvider i18n={i18n()}>
				<Suspense fallback={""}>
					<React.StrictMode>
						<Component {...{ store }} />
					</React.StrictMode>
				</Suspense>
			</I18nextProvider>
		</Provider>,
		document.getElementById("root")
	);
};

render(Routes);

if (module.hot) {
	module.hot.accept("./routes", () => {
		const NextApp = require("./routes").default;
		render(NextApp);
	});
}

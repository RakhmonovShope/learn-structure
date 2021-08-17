import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import Routes from "./routes.js";

const render = Component => {
	ReactDOM.render(
		<React.StrictMode>
			<Suspense fallback={""}>
				<Component />
			</Suspense>
		</React.StrictMode>,
		document.getElementById("root")
	);
};

render(Routes);

// if (module.hot) {
//   module.hot.accept("./routes", () => {
//     const NextApp = require("./routes").default;
//     render(NextApp);
//   });
// }

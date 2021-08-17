import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";

import App from "./App";

const Home = lazy(() => import("./pages/Home"));

const routes = [{ path: "/", exact: true, component: Home }];

export default () => (
	<Router>
		<App>
			<Suspense fallback={""}>
				<Switch>
					{routes.map((route, key) => (
						<Route
							path={route.path}
							exact={route.exact}
							component={route.component}
							key={key}
						/>
					))}
				</Switch>
			</Suspense>
		</App>
	</Router>
);

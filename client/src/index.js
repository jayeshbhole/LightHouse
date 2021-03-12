import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/scss/index.scss";
import { DataStoreProvider } from "./context/DataStore";

ReactDOM.render(
	<React.StrictMode>
		<DataStoreProvider>
			<App />
		</DataStoreProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Dependancies
import React from "react";
import "./assets/scss/App.scss";

import firebase from "firebase/app";
import "firebase/auth";

// Components
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navigation from "./components/navbar2";
import Login from "./components/Login";
import Projects from "./components/Projects";

// Contexts
import { DataStoreProvider } from "./context/DataStore";

const App = () => {
	return (
		<div className="app">
			<DataStoreProvider>
				<BrowserRouter>
					<Navigation />
					<br />
					<Switch>
						{/* <Route exact path="/" component={() => <Landing />}></Route> */}
						<Route exact path="/projects" component={Projects} />
						<Route exact path="/kanban" />
						<Route exact path="/login" component={() => <Login />} />
					</Switch>
				</BrowserRouter>
			</DataStoreProvider>
		</div>
	);
};

export default App;

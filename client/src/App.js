// Dependancies
import React from "react";
import "firebase/auth";

// Styles
import "./assets/scss/App.scss";

// Components
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navigation from "./components/navbar2";
import Login from "./components/Login";
import Projects from "./components/Projects";
import Kanban from "./components/Kanban";

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
						<Route exact path="/kanban/:projectID" component={Kanban} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</BrowserRouter>
			</DataStoreProvider>
		</div>
	);
};

export default App;

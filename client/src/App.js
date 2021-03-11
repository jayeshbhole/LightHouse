// Dependancies
import React, { useContext } from "react";
import "firebase/auth";

// Styles
import "./assets/scss/App.scss";

// Components
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navigation from "./components/Navbar2";
import Login from "./components/Login";
import Projects from "./components/Projects";
import ProjectSpace from "./components/ProjectSpace";

// Contexts
import { DataStore, DataStoreProvider } from "./context/DataStore";

const App = () => {
	return (
		<div className="app">
			<DataStoreProvider>
				<BrowserRouter>
					<Navigation />
					<Switch>
						{/* <Route exact path="/" component={() => <Landing />}></Route> */}

						{/* Paths for authenticated user */}
						<Route exact path="/projects" component={Projects} />
						<Route path="/p/:projectID/" component={ProjectSpace} />
						<Route exact path="/login" component={Login} />
						<Redirect to="/login" />
					</Switch>
				</BrowserRouter>
			</DataStoreProvider>
		</div>
	);
};

export default App;

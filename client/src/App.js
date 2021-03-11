// Dependancies
import React, { useContext } from "react";
import "firebase/auth";

// Styles
import "./assets/scss/App.scss";

// Components
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navbar2 from "./components/Navbar2";

import Login from "./components/Login";
import Projects from "./components/Projects";
import ProjectSpace from "./components/ProjectSpace";

// Contexts
import { DataStore } from "./context/DataStore";

const App = () => {
	const {
		authUser: [isLoggedIn, isLoading, error],
	} = useContext(DataStore);
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar2 />
				<Switch>
					{/* <Route exact path="/" component={() => <Landing />}></Route> */}

					{/* Paths for authenticated user */}
					{isLoggedIn && <Route exact path="/projects" component={Projects} />}
					{isLoggedIn && (
						<Route path="/p/:projectID/" component={ProjectSpace} />
					)}

					{/* Unauthorised */}
					<Route exact path="/login" component={Login} />
					{!isLoading && !isLoggedIn && <Redirect to="/login" />}
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;

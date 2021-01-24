import React from "react";
import "./assets/scss/app.scss";
import firebase, { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navigation from "./components/navbar2";
import Login from "./components/login";

function App() {
	const [user] = useAuthState(auth);
	return (
		<div className="app">
			<BrowserRouter>
				<Navigation user={user} auth={auth} />
				<br />
				<br />
				<Switch>
					{/* <Route exact path="/" component={() => <Landing />}></Route> */}
					<Route exact path="/kanban"></Route>
					<Route exact path="/login" component={() => <Login user={user} firebase={firebase} auth={auth} />}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

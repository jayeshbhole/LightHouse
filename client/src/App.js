import React from "react";
import "./assets/scss/App.scss";
import firebase, { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/landing.jsx";
import Navigation from "./components/navbar2";
import Login from "./components/login";
import Projects from "./components/projects";

function App() {
	const [user] = useAuthState(auth);
	const [userdata, setUserData] = React.useState();
	if (user && !userdata) {
		db.doc("users/" + user.uid).onSnapshot((doc) => {
			if (!doc.exists) {
				db.doc("users/" + user.uid).set({
					name: user.displayName,
					email: user.email,
					projects: [],
				});
			} else {
				setUserData(doc.data());
			}
		});
	}
	return (
		<div className="app">
			<BrowserRouter>
				<Navigation user={user} auth={auth} />
				<br />
				<br />
				<Switch>
					{/* <Route exact path="/" component={() => <Landing />}></Route> */}
					<Route
						exact
						path="/projects"
						component={() => (
							<Projects
								user={user}
								firebase={firebase}
								db={db}
								userdata={userdata}
							/>
						)}></Route>
					<Route exact path="/kanban"></Route>
					<Route
						exact
						path="/login"
						component={() => (
							<Login user={user} firebase={firebase} auth={auth} />
						)}></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

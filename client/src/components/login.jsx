import React from "react";
import { Redirect } from "react-router-dom";

const Login = ({ user, firebase, auth }) => {
	return !!user ? (
		<Redirect path="/loggedin" />
	) : (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<button
				onClick={() => {
					const provider = new firebase.auth.GoogleAuthProvider();
					auth.signInWithPopup(provider);
				}}
			>
				Login
			</button>
		</div>
	);
};

export default Login;

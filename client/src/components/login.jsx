import React from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bulma-components/lib/components/button";

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
			<Button
				color="primary"
				onClick={() => {
					const provider = new firebase.auth.GoogleAuthProvider();
					auth.signInWithPopup(provider);
				}}
			>
				Login
			</Button>
		</div>
	);
};

export default Login;

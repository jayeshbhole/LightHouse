import React from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bulma-components/lib/components/button";
import Card from "react-bulma-components/lib/components/card";
import "../assets/scss/login.scss";

const Login = ({ user, firebase, auth }) => {
	return !!user ? (
		<Redirect path="/" />
	) : (
		<Card className="login-card">
			<Button
				color="primary"
				onClick={() => {
					const provider = new firebase.auth.GoogleAuthProvider();
					auth.signInWithPopup(provider);
				}}>
				Login With Google
			</Button>
			<Button
				className="is-dark"
				onClick={() => {
					const provider2 = new firebase.auth.GithubAuthProvider();
					auth.signInWithPopup(provider2);
				}}>
				Login With GitHub
			</Button>
		</Card>
	);
};

export default Login;

import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { DataStore } from "../context/DataStore";
// Components
import Button from "react-bulma-components/lib/components/button";
import Card from "react-bulma-components/lib/components/card";
import "../assets/scss/login.scss";

const Login = () => {
	const { authUser, auth, firebase } = useContext(DataStore);

	return authUser[0] ? (
		<Redirect to="/projects" />
	) : (
		<div className="page login">
			<Card className="login-card">
				<h1 className="title is-4">Login to Continue</h1>
				<br />
				<br />
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
		</div>
	);
};

export default Login;

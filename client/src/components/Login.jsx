import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { DataStore } from "../context/DataStore";
// Styles
import "../assets/scss/login.scss";

const Login = () => {
	const { authUser, auth, firebase } = useContext(DataStore);

	return authUser[0] ? (
		<Redirect to="/projects" />
	) : (
		<div className="page login">
			<div className="login-card">
				<h1>Login to Continue</h1>
				<br />
				<br />
				<button
					id="google"
					onClick={() => {
						const provider = new firebase.auth.GoogleAuthProvider();
						auth.signInWithPopup(provider);
					}}>
					Sign In With Google
				</button>
				<button
					id="github"
					onClick={() => {
						const provider2 = new firebase.auth.GithubAuthProvider();
						auth.signInWithPopup(provider2);
					}}>
					Sign In With GitHub
				</button>
			</div>
		</div>
	);
};

export default Login;

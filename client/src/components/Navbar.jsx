import { useContext } from "react";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import Logo from "../assets/img/Logo.svg";
import NotifBell from "../assets/img/NotifBell.png";
import { DataStore } from "../context/DataStore";

const Navbar = () => {
	const { authUser, notifications, db, userData, logout, project } = useContext(
		DataStore
	);
	const accept = (projectId) => {
		let index = -1;
		db.doc("projects" + projectId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					db.doc("projects" + projectId).update({
						users:
							doc.data().users.filter((user) => user.email !== userData.email) +
							[
								{
									email: userData.email,
									name: userData.name,
									photoURL: userData.photoURL,
									status: "member",
								},
							],
					});
				}
			});
	};
	const reject = (projectId) => {
		let index = -1;
		db.doc("projects" + projectId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					db.doc("projects" + projectId).update({
						users: doc
							.data()
							.users.filter((user) => user.email != userData.email),
					});
				}
			});
	};
	return (
		<nav className="navbar">
			{/* Display Logo */}
			<NavLink className="nav-item brand" to="/">
				<img src={Logo} alt="" />
				{/* Brand Name if on Home */}
				<Route exact path="/" render={() => "LightHouse"} />
			</NavLink>

			{/* On some project page */}
			<Route
				path="/p/:projectID"
				component={() => <NavSignedProject name={project?.name} />}
			/>
			<Route
				exact
				path="/projects"
				render={() => <span className="nav-item"> Your Projects </span>}
			/>

			{/* Show Kanban/Mindmap if not logged in */}
			{!authUser[0] ? (
				<Route path="/">
					<NavLink to="/kanban" className="nav-item">
						Kanban
					</NavLink>
					<NavLink to="/mindmap" className="nav-item">
						MindMap
					</NavLink>
				</Route>
			) : null}

			{/* Notification and Profile Icons if logged in else Login */}
			{authUser[0] ? (
				<>
					<img src={NotifBell} alt="" />
					<div className="nav-item profile">
						<img src={userData?.photoURL} alt="" />
						<div className="dropdown">
							<span onClick={logout}>Sign Out</span>
							<span>Your Profile</span>
							<span>Settings</span>
						</div>
					</div>
				</>
			) : (
				<NavLink to="/login" className="nav-item">
					LogIn
				</NavLink>
			)}
		</nav>
	);
};

const NavSignedProject = ({ name }) => {
	const { projectID } = useParams();
	return (
		<>
			{/* Name of Project and Kanban/Mindmap Links */}
			<span>{name}</span>
			<NavLink to={`/p/${projectID}/kanban`} className="nav-item">
				Kanban
			</NavLink>
			<NavLink to={`p/${projectID}/mindmap`} className="nav-item">
				Mind Map
			</NavLink>
		</>
	);
};

export default Navbar;

import { useContext } from "react";
import { NavLink, Switch, Route, useParams } from "react-router-dom";
import Logo from "../assets/img/Logo.svg";
import NotifBell from "../assets/img/NotifBell.png";
import { DataStore } from "../context/DataStore";
import "../assets/scss/Navbar.scss";

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
		<nav>
			<div className="navbar">
				<div className="start">
					{/* Display Logo */}
					<span className="nav-item">
						<NavLink className="brand" to="/">
							<img src={Logo} alt="" />
							{/* Brand Name if on Home */}
							<Route exact path="/" render={() => "LightHouse"} />
						</NavLink>
					</span>

					{/* On some project page */}
					<Route
						path="/p/:projectID"
						component={() => (
							<span className="nav-item">
								<NavSignedProject name={project?.name} />
							</span>
						)}
					/>
					<Route
						exact
						path="/projects"
						render={() => <span className="nav-item"> Your Projects </span>}
					/>

					{/* Show Kanban/Mindmap if not logged in */}
					{!authUser[0] ? (
						<Route path="/">
							<span className="nav-item">
								<NavLink to="/kanban">Kanban</NavLink>
							</span>
							<span className="nav-item">
								<NavLink to="/mindmap">MindMap</NavLink>
							</span>
						</Route>
					) : null}
				</div>
				<div className="end">
					{/* Notification and Profile Icons if logged in else Login */}
					{authUser[0] ? (
						<>
							<div className="nav-item dropdown">
								<div className="image">
									<img src={NotifBell} alt="" />
								</div>
								<div className="dropdown-box"></div>
							</div>
							<div className="nav-item profile dropdown">
								<img src={userData?.photoURL} alt="" />
								<div className="dropdown-box">
									<a onClick={logout}>Sign Out</a>
									<a>Your Profile</a>
									<a>Settings</a>
								</div>
							</div>
						</>
					) : (
						<span className="nav-item">
							<NavLink to="/login">LogIn</NavLink>
						</span>
					)}
				</div>
			</div>
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

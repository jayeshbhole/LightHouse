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
			<NavLink className="nav-item brand" to="/">
				<img src={Logo} alt="" />
				<Route exact path="/" render={() => "LightHouse"} />
			</NavLink>
			<Route
				path="/p/:projectID"
				component={() => <NavSignedProject name={project?.name} />}
			/>
			<Route
				exact
				path="/projects"
				render={() => <span className="nav-item"> Your Projects </span>}
			/>
			<Route exact path="/">
				<NavLink to="/projects">Your Projects</NavLink>
			</Route>

			{!authUser[0] && (
				<Route exact path="/">
					<NavLink to="/kanban" className="nav-item">
						Kanban
					</NavLink>
					<NavLink to="/mindmap" className="nav-item">
						MindMap
					</NavLink>
				</Route>
			)}

			{authUser[0] ? (
				<>
					<img src={NotifBell} alt="" />
					<div className="nav-item profile">
						<img src={userData?.photoURL} alt="" srcset="" />
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

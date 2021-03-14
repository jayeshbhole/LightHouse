import { useContext } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
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
							.users.filter((user) => user.email !== userData.email),
					});
				}
			});
	};

	return (
		<nav>
			<div className="navbar">
				<div className="start">
					{/* Display Logo */}
					<span className="nav-item brand">
						<NavLink className="" to="/">
							<img src={Logo} alt="" />
							{/* Brand Name if on Home */}
							<Route
								exact
								path={["/", "/kanban", "/mindmap", "/login"]}
								component={() => <span>LightHouse</span>}
							/>
						</NavLink>
					</span>
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

					{/* On some project page */}
					{authUser[0] ? (
						<>
							<Route
								path="/p/:projectID"
								component={() => <NavSignedProject name={project?.name} />}
							/>
							<Route
								exact
								path="/projects"
								render={() => (
									<span className="nav-item">
										<NavLink to="/projects">Your Projects</NavLink>
									</span>
								)}
							/>
						</>
					) : null}
				</div>
				<div className="end">
					{/* Notification and Profile Icons if logged in else Login */}
					{authUser[0] ? (
						<>
							<span
								className={`nav-item bell ${
									notifications?.length ? "unseen" : null
								} dropdown`}>
								<img src={NotifBell} alt="" />
								<div className="dropdown-box">
									<div className="notification">
										<div className="notif-text">Hello</div>
										<div className="notif-actions">
											<button>
												<i class="gg-check"></i>
											</button>
											<button>
												<i class="gg-close"></i>
											</button>
										</div>
									</div>
								</div>
							</span>
							<span className="nav-item profile dropdown">
								<img src={userData?.photoURL} alt="" />
								<div className="dropdown-box">
									<a href="/" onClick={logout}>
										Sign Out
									</a>
									<a>Your Profile</a>
									<a>Settings</a>
								</div>
							</span>
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
			<span className="nav-item project-title">
				<NavLink to={`/p/${projectID}`}>
					{name} {" >"}
				</NavLink>
			</span>
			<span className="nav-item">
				<NavLink to={`/p/${projectID}/kanban`}>Kanban</NavLink>
			</span>
			<span className="nav-item">
				<NavLink to={`/p/${projectID}/mindmap`}>Mind Map</NavLink>
			</span>
		</>
	);
};

export default Navbar;

import { useContext } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import Logo from "../assets/img/Logo.svg";
import NotifBell from "../assets/img/NotifBell.png";
import { DataStore } from "../context/DataStore";
import "../assets/scss/Navbar.scss";

const Navbar = () => {
	const {
		authUser,
		notifications,
		db,
		userData,
		logout,
		project,
		firebase,
	} = useContext(DataStore);

	if (!userData) return <div>loading</div>;

	const u = {
		email: userData.email,
		status: "invited",
	};

	const accept = (n) => {
		db.doc("projects/" + n.project).update({
			usersemail: firebase.firestore.FieldValue.arrayUnion(userData.email),
			users: firebase.firestore.FieldValue.arrayUnion({
				email: userData.email,
				status: "member",
				photoURL: userData.photoURL,
				name: userData.name,
			}),
		});
		db.doc("projects/" + n.project).update({
			users: firebase.firestore.FieldValue.arrayRemove(u),
		});
		clearnotif(n);
	};
	const reject = (n) => {
		db.doc("projects/" + n.project).update({
			users: firebase.firestore.FieldValue.arrayRemove(u),
		});
		clearnotif(n);
	};

	const clearnotif = (n) => {
		db.doc("notifications/" + userData.email).update({
			notifications: firebase.firestore.FieldValue.arrayRemove(n),
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
								<div className="n-box dropdown-box">
									{notifications?.map((n, index) => {
										if (n.type == "invite")
											return (
												<div className="notification" key={index}>
													<div className="notif-text">{n.title}</div>
													<div className="notif-actions">
														<button
															className="accept"
															onClick={() => accept(n)}>
															<i className="gg-check"></i>
														</button>
														<button
															className="reject"
															onClick={() => reject(n)}>
															<i className="gg-close"></i>
														</button>
													</div>
												</div>
											);
									})}
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

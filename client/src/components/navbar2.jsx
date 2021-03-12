import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bulma-components/lib/components/navbar";
import Container from "react-bulma-components/lib/components/container";
import Logo from "../assets/img/Logo.svg";

import { DataStore } from "../context/DataStore";
const Navigation = () => {
	const { authUser, notifications, db, userData, logout } = useContext(
		DataStore
	);
	const [active, setActive] = useState(false);

	const accept = (projectId) => {
		let index = -1;
		db.doc("projects" + projectId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					db.doc("projects" + projectId).update({
						users:
							doc.data().users.filter((user) => user.email != userData.email) +
							[
								{
									email: userData.email,
									name: userData.name,
									photoURL: authUser[0].photoURL,
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
		<Navbar className="px-4" fixed="top" active={active}>
			<Container fluid>
				<Navbar.Brand>
					<Navbar.Item>
						<img src={Logo} alt="" />
					</Navbar.Item>
					<Navbar.Burger onClick={() => setActive(!active)} />
				</Navbar.Brand>
				<Navbar.Menu>
					<Navbar.Container>
						{authUser && (
							<NavLink className="navbar-item" to="/projects">
								Projects
							</NavLink>
						)}
					</Navbar.Container>
					<Navbar.Container position="end">
						{authUser[0] ? (
							<NavLink
								to="/login"
								className="navbar-item danger"
								onClick={() => {
									logout();
								}}>
								Log Out
							</NavLink>
						) : (
							<Navbar.Item href="/login">Login</Navbar.Item>
						)}
					</Navbar.Container>
				</Navbar.Menu>
			</Container>
		</Navbar>
	);
};

export default Navigation;

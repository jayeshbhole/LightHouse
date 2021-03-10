import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bulma-components/lib/components/navbar";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import Button from "react-bulma-components/lib/components/button";

import { DataStore } from "../context/DataStore";
const Navigation = () => {
	const { authUser, auth, notifications, db, userData } = useContext(DataStore);
	const [active, setActive] = React.useState(false);

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
		<Navbar fixed="top" active={active}>
			<Container fluid>
				<Navbar.Brand>
					<Navbar.Item>
						<Heading size={4}>LightHouse</Heading>
					</Navbar.Item>
					<Navbar.Burger onClick={() => setActive(!active)} />
				</Navbar.Brand>
				<Navbar.Menu>
					<Navbar.Container>
						{/* <Navbar.Item>
							<NavLink exact to="/">
								Home
							</NavLink>
						</Navbar.Item>
						<Navbar.Item>
							<NavLink to="/kanban">Kanban Board</NavLink>
						</Navbar.Item>
						<Navbar.Item>
							<NavLink to="/mindmap">Mind Map</NavLink>
						</Navbar.Item> */}
						{authUser && (
							<Navbar.Item>
								<NavLink to="/projects">Projects</NavLink>
							</Navbar.Item>
						)}
					</Navbar.Container>
					<Navbar.Container position="end">
						{/* <Navbar.Item> */}
						{authUser[0] ? (
							<Navbar.Item color="danger" onClick={() => auth.signOut()}>
								Log Out
							</Navbar.Item>
						) : (
							<Navbar.Item href="/login">Login</Navbar.Item>
						)}
						{/* </Navbar.Item> */}
					</Navbar.Container>
				</Navbar.Menu>
			</Container>
		</Navbar>
	);
};

export default Navigation;

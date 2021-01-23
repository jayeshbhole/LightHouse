import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<nav>
				<ul className="navbar">
					{/* <li className="login">Login</li> */}
					<li>
						<NavLink exact className="--item" to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink className="--item" to="/kanban">
							Kanban Board
						</NavLink>
					</li>
					<li>
						<NavLink className="--item" to="/mindmap">
							Mind Map
						</NavLink>
					</li>
					{this.props.user ? (
						<button onClick={() => this.props.auth.signOut()}>
							Log Out
						</button>
					) : (
						<li className="login">
							<NavLink className="--item" to="/login">
								Login
							</NavLink>
							<img
								src={require("../assets/img/login.svg")}
								alt=""
							/>
						</li>
					)}
				</ul>
			</nav>
		);
	}
}

export default Navigation;

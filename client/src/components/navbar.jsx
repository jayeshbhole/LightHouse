import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bulma-components/lib/components/button";
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
					<li className="login">
						{this.props.user ? (
							<Button
								color="danger"
								onClick={() => this.props.auth.signOut()}
							>
								Log Out
							</Button>
						) : (
							<React.Fragment>
								<NavLink className="--item" to="/login">
									Login
								</NavLink>
								<img
									src={require("../assets/img/login.svg")}
									alt=""
								/>
							</React.Fragment>
						)}
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navigation;

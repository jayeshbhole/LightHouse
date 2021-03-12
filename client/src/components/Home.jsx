import React from "react";
import Banner from "../assets/img/banner.svg";
import "../assets/scss/Home.scss";

const Home = () => {
	return (
		<React.Fragment>
			<div className="hero">
				<div className="lhs">
					<p className="tag-line">Master the art of productivity</p>
					<h1 className="title">
						Get Going.
						<br />
						Get Organized.
						<br />
						Get Things <span className="high">Done</span>.
					</h1>
					<button className="cta">Start Planning</button>
				</div>
				<div className="rhs">
					<img src={Banner} alt="" />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;

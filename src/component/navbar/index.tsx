import React from "react";
import "./navbar.scss";
import Link from "next/link";

function Navbar() {
	return (
		<div className="main-nav">
			<nav className="navbar">
				<div className="navbar-container container">
					<input type="checkbox" name="" id="" />
					<div className="hamburger-lines">
						<span className="line line1"></span>
						<span className="line line2"></span>
						<span className="line line3"></span>
					</div>
					<ul className="menu-items">
						<li>
							<Link href="/">Product</Link>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
					<h1 className="logo">
						<Link href="/">NextTest</Link>
					</h1>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;

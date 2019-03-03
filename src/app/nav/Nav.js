import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

const Nav = () => {
	return (
		<nav>
			<ul className="nav-list">
				<li className="nav-list__item">
					<NavLink exact className="nav-list__link" activeClassName="nav-list__link--active" to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-list__item">
					<NavLink className="nav-list__link" activeClassName="nav-list__link--active" to="/battle">
						Battle
					</NavLink>
				</li>
				<li className="nav-list__item">
					<NavLink className="nav-list__link" activeClassName="nav-list__link--active" to="/popular">
						Popular
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;

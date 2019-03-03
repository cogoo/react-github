import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerPreview.css';

class PlayerPreview extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section>
				<div>
					<img src={this.props.avatar} />
				</div>
				<p>{this.props.username}</p>
				{this.props.children}
			</section>
		);
	}
}

PlayerPreview.propTypes = {
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	children: PropTypes.children
};

export default PlayerPreview;

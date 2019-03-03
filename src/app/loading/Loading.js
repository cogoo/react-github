import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text
		};
	}

	componentDidMount() {
		const stopper = this.props.text + '...';
		this.interval = window.setInterval(() => {
			if (this.state.text == stopper) {
				this.setState(() => ({ text: this.props.text }));
			} else {
				this.setState((prevState) => ({ text: prevState.text + '.' }));
			}
		}, this.props.speed);
	}

	componentWillMount() {
		window.clearInterval(this.interval);
	}

	render() {
		return <p>{this.state.text}</p>;
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
};

export default Loading;

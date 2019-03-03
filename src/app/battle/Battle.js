import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Battle.css';
import PlayerPreview from '../player-preview/PlayerPreview';

class PlayerInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		};
	}

	handleChange(event) {
		const inputValue = event.target.value;
		this.setState(() => ({
			username: inputValue
		}));
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.props.id, this.state.username);
	}

	render() {
		const { username } = this.state;
		const { label } = this.props;
		return (
			<form className="form" onSubmit={($event) => this.handleSubmit($event)}>
				<label className="form__label" htmlFor="username">
					{label}
				</label>
				<input
					id="username"
					placeholder="Github Username"
					type="text"
					value={username}
					onChange={($event) => this.handleChange($event)}
				/>
				<button className="form__button" type="submit" disabled={!username}>
					Submit User
				</button>
			</form>
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func
};

class Battle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(() => ({
			[`${id}Name`]: username,
			[`${id}Image`]: `https://github.com/${username}.png?size=200`
		}));
	}

	handleReset(id) {
		this.setState(() => ({
			[`${id}Name`]: '',
			[`${id}Image`]: null
		}));
	}

	render() {
		const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
		const { match } = this.props;
		return (
			<section>
				<div className="flex flex-justify--space-evenly">
					{!playerOneName ? (
						<PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />
					) : (
						<PlayerPreview username={playerOneName} avatar={playerOneImage}>
							<button onClick={() => this.handleReset('playerOne')}>Reset</button>
						</PlayerPreview>
					)}

					{!playerTwoName ? (
						<PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />
					) : (
						<PlayerPreview username={playerTwoName} avatar={playerTwoImage}>
							<button onClick={() => this.handleReset('playerTwo')}>Reset</button>
						</PlayerPreview>
					)}
				</div>
				{playerOneName &&
					playerTwoName && (
					<Link
						to={{
							pathname: `${match.url}/results`,
							search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
						}}
					>
							Battle
					</Link>
				)}
			</section>
		);
	}
}

Battle.propTypes = {
	match: PropTypes.object
};

export default Battle;

//@ts-check
import React, { Component } from 'react';
import { parse } from 'query-string';
import { battle } from '../../utils/api';
import PlayerPreview from '../player-preview/PlayerPreview';
import PropTypes from 'prop-types';
import './Results.css';

const Player = props => {
	return (
		<div>
			<h2>{props.label}</h2>
			<h3>{props.profile.score}</h3>
			<PlayerPreview username={props.profile.profile.login} avatar={props.profile.profile.avatar_url}>
				<ul>
					<li>Followers: {props.profile.profile.followers}</li>
					<li>Following: {props.profile.profile.following}</li>
					<li>Public Repos: {props.profile.profile.public_repos}</li>
				</ul>
			</PlayerPreview>
		</div>
	);
};

Player.propTypes = {
	label: PropTypes.string.isRequired,
	profile: PropTypes.object
};

class Results extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}

	componentDidMount() {
		const players = parse(this.props.location.search);
		battle([players.playerOneName, players.playerTwoName]).then(results => {
			if (results === null) {
				return this.setState(() => {
					return {
						error: 'Looks like there was an error',
						loading: false
					};
				});
			}

			this.setState(() => {
				const [winner, loser] = results;
				return {
					error: null,
					winner,
					loser,
					loading: false
				};
			});
		});
	}

	render() {
		if (this.state.loading === true) {
			return <p>Loading ...</p>;
		}

		if (!!this.state.error === true) {
			return <p>{this.state.error}</p>;
		}

		return (
			<section>
				<div>
					<Player label="Winer" profile={this.state.winner} />
					<Player label="Loser" profile={this.state.loser} />
				</div>
			</section>
		);
	}
}

Results.propTypes = {
	location: PropTypes.object
};

export default Results;

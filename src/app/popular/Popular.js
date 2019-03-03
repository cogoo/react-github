//@ts-check
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../../utils/api';
import Loading from '../loading/Loading';
import './Popular.css';

const SelectLanguage = ({ selectedLanguage, onSelect }) => {
	const languages = ['All', 'JavaScript', 'TypeScript', 'CSS'];
	return (
		<ul className="language-list">
			{languages.map((lang) => {
				return (
					<li
						key={lang}
						className="language-list__item"
						style={lang === selectedLanguage ? { color: '#ff6600' } : null}
						onClick={() => onSelect(lang)}
					>
						{lang}
					</li>
				);
			})}
		</ul>
	);
};

const RepoGrid = ({ repos }) => {
	if (!repos) return null;
	return (
		<ul className="repo-list">
			{repos.map((repo, index) => {
				return (
					<li className="repo-list__item" key={repo.name}>
						<div className="repo">
							<div className="repo__avatar-wrapper">
								<img className="repo__avatar" src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`} />
								<div className="repo__">
									<p className="repo__meta">#{index + 1}</p>
									<h2 className="repo__name">
										<a className="repo__link" href={repo.html_url} rel="noopener noreferrer" target="_blank">
											{repo.name}
										</a>
									</h2>
									<p className="repo__handle">@{repo.owner.login}</p>
								</div>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			};
		});

		fetchPopularRepos(lang).then((repos) => {
			this.setState(() => ({
				repos
			}));
		});
	}

	render() {
		return (
			<section>
				<SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
				{this.state.repos ? <RepoGrid repos={this.state.repos} /> : <Loading text="Loading Repos" />}
			</section>
		);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
}

export default Popular;

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

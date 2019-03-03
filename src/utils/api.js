//@ts-check
import axios from 'axios';

const params = 'client_id=1a2f33e225d9cd36f8d2&client_secret=3334369fbda5aac668de5e4fbba591e04e76e536';

const fetchPopularRepos = (language) => {
	const encodedURI = encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=repositories`
	);

	return axios.get(encodedURI).then((response) => {
		return response.data.items;
	});
};

const battle = (players) => {
	return axios
		.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError);
};

const getProfile = (username) => {
	return axios.get(`https://api.github.com/users/${username}?${params}`).then((response) => response.data);
};

const getRepos = (username) => {
	return axios
		.get(`https://api.github.com/users/${username}/repos?per_page=100&${params}`)
		.then((response) => response.data);
};

const getStarCount = (repos) => {
	return repos.reduce((count, repo) => {
		return count + repo.stargazers_count;
	}, 0);
};

const calculateScore = (profile, repos) => {
	const followers = profile.followers;
	const totalStars = getStarCount(repos);

	return followers * 3 + totalStars;
};

const handleError = (error) => {
	return error;
};

const getUserData = (player) => {
	return axios.all([getProfile(player), getRepos(player)]).then((data) => {
		const [profile, repos] = data;

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		};
	});
};

const sortPlayers = (players) => {
	return players.sort((a, b) => b.score - a.score);
};

export { fetchPopularRepos, battle };

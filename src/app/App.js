//@ts-check
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Popular from './popular/Popular';
import Nav from './nav/Nav';
import Battle from './battle/Battle';
import Results from './results/Results';

const App = () => {
	return (
		<BrowserRouter>
			<section className="container">
				<Nav />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/battle" component={Battle} />
					<Route path="/battle/results" component={Results} />
					<Route path="/popular" component={Popular} />
					<Route
						render={() => {
							return <p>Not Found</p>;
						}}
					/>
				</Switch>
			</section>
		</BrowserRouter>
	);
};

export default App;

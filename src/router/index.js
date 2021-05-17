import React from "react";
import { Route, Switch, BrowserRouter as Router , Redirect} from "react-router-dom";

// Pages
import VoteCounter from "../voting-counter";

function RouterComponent(props) {
	return (
		<Router>
			<Switch>
				<Route exact={true} path="/" component={VoteCounter} />
			</Switch>
		</Router>
	);
}

export default RouterComponent;
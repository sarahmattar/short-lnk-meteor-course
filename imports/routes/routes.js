import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

window.browserHistory = browserHistory;

const unauthenticatedPages = ["/", "/signup", "/notfound"];
const authenticatedPages = ["/links"];

const onEnterPublicPage = () => {
	if (Meteor.userId()) {
		browserHistory.replace("/links");
	}
};

const onEnterPrivatePage = () => {
	if (!Meteor.userId()) {
		browserHistory.replace("/");
	}
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

export const onAuthChange = (isAuthenticated) => {

	console.log("isAuthenticated", isAuthenticated);

	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);

	if (Meteor.userId() && isUnauthenticatedPage) {
		browserHistory.replace("/links");
	} else if (!isAuthenticated && isAuthenticatedPage) {
		browserHistory.replace("/");
	}

};

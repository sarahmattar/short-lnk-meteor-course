import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				links: []
			};
		};

	componentDidMount() {
		console.log("componentDidMount from LinksList");
		this.LinksTracker = Tracker.autorun(() => {
			Meteor.subscribe('links');
			const links = Links.find({
				visible: Session.get('showVisible')
				}).fetch();
			this.setState({ links }); // we are updating the state defined above with an array full of values.
		});
	};

	componentWillUnmount() {
		console.log("componentWillUnmount from LinksList");
		this.LinksTracker.stop();
	};

	renderLinksListItems() {
		if (this.state.links.length === 0) {
			return (
				<div className="item">
					<p className="item__status-message">No Links Found</p>
				</div>
				);
		} 

		return this.state.links.map((link) => {
			const shortUrl = Meteor.absoluteUrl(link._id);
			return (<LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>);
			// return <p key={link._id}>{link.url}</p>; //this is v. similar to PlayerList array mapping
		});
	};

	render() {
		return (
			<div>
				<FlipMove maintainContainerHeight={true}>
					{this.renderLinksListItems()}
				</FlipMove>
			</div>		
			);
	}
}
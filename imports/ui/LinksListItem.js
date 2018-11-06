import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/links';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		}
	}

	componentDidMount(){

		this.clipboard = new Clipboard(this.refs.copy); // we change the clipboard from a const to this to allow it to be used in both methods.
		this.clipboard.on('success', () => {
			// alert("link copied");
			this.setState({ justCopied: true });
			setTimeout(() => {
				this.setState({ justCopied: false });
			}, 1000)
		}).on('error', () => {
			alert("unable to copy link");
		});
	}

	componentWillUnmount(){
	
		this.clipboard.destroy();
	}

	renderStats(){
		const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let visitedMessage = null;

		if (typeof this.props.lastVisitedAt === 'number'){
		
			visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
		}
		return <p>{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>
	}

	render() {
		return (
			<div className="item">
				<h2>{this.props.url}</h2>
				<p className="item__message">{this.props.shortUrl}</p>
				<p className="item__message">{this.props.visible.toString()}</p>
				{this.renderStats()}
				<div className="button--group">
				<a className="button button--pill button--link" 
					href={this.props.shortUrl} 
					target="_blank">Visit</a>
				<button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'Copied' : 'Copy'}</button>
				<button className="button button--pill" 
						onClick={() => { 
							Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}}>
								{this.props.visible ? 'Hide' : 'Unhide'}
				</button>
				</div>
			</div>
			);
	}
}

LinksListItem.PropTypes = {
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	shortUrl: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	lastVisitedAt: PropTypes.number,
	visitedCount: PropTypes.number.isRequired
}
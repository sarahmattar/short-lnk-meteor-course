import React from 'react';
import { Link } from 'react-router';

// export default class NotFound extends React.Component {
//   render() {
//     return <p>NotFound component here</p>;
//   }
// }

export default () => {
	return (
		<div className="boxed-view">
			<div className="boxed-view__box">
			<h1>404: Not Found</h1>
			<p>Hmm, we're unable to find that page.</p>
			<Link to="/" className="button button--link">Head Home</Link>
			</div>
		</div>
		);
}
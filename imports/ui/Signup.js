import React from 'react';
import { Link } from 'react-router';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();

		if (password.length < 9) {
			return this.setState({error: "Password must be at least 9 characters long"});
		}

		Accounts.createUser({email, password}, (err) => {
			if (err) {
				this.setState({error: err.reason});
			} else {
				this.setState({error: ""});
			}
		});
	}

  	render() {
	    return (
	      <div className="boxed-view">
	      	<div className="boxed-view__box">
	        <h1>Join Short Lnk</h1>

	        {this.state.error ? <p>{this.state.error}</p> : undefined}
	        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
	        	<input type="email" ref="email" name="email" placeholder="Your email address here" />
	        	<input type="password" ref="password" name="password" placeholder="password here" />
	        	<button className="button">Create Account</button>
	        </form>

	        <Link to="/">Already have an account?</Link>
	        </div>
	      </div>
	    );
	  }
	}

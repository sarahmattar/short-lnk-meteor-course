import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

	onSubmit(e) {
    	const { url } = this.state;
      
    	e.preventDefault();

	    // if (url) {
	      Meteor.call('links.insert', url, (err, res) => {
          if (!err) {
            this.setState({
              url: "", //this wipes the input field post submission
              isOpen: false,
              error: ""
            });
          } else {
            this.setState({
              error: err.reason
            });
          }
        });
	    // }
  	}

  handleModalClose(){
    this.setState({
      isOpen: false,
      url: "",
      error: ""
    });
  }

  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }

  render() {
  	return (
			<div>
        <button className="button" onClick={() =>{this.setState({isOpen: true})}}> + Add Link </button>
        <Modal isOpen={this.state.isOpen}
                className="boxed-view__box"
                overlayClassName="boxed-view boxed-view__modal" 
                contentLabel="Add Link"
                onAfterOpen={() => {
                  this.refs.url.focus();
                }}
                onRequestClose={this.handleModalClose.bind(this)}>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
  				<form className="boxed-view__form"
                onSubmit={this.onSubmit.bind(this)}>
      			<input  type="text" 
                    placeholder="Your URL here" 
                    ref="url"
                    value={this.state.url} 
                    onChange={this.onChange.bind(this)}/>
      			<button className="button">Add Link</button>
            <button type="button"
                    className="button button--secondary" 
                    onClick={() =>{this.setState({isOpen: false, url: "", error:""})}}>Cancel</button>
          </form>
        </Modal>
			</div>
  			)
  	}
}
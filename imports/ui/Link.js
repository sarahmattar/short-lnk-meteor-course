import React from 'react';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
  	<div>
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
	      <LinksListFilters/>
	      <AddLink/>
	      <LinksList/>
      </div>
    </div>
    );
};

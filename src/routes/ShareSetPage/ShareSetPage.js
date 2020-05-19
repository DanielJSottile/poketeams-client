import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import SetPublic from '../../components/Set-Public/Set-Public';

export default class ShareSetPage extends Component {

  static contextType = UserContext;  

  render() {

    const {publicSets} = this.context;
    const set = publicSets.filter(set => Number(set.id) === Number(this.props.match.params.set_id))

    return (
      <div>
        {<SetPublic set={set[0]}/> || <p>It seems this set no longer exists.</p>}
      </div>
    );
  };
};

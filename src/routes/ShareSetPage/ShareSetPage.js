import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import apiService from '../../services/apiService';
import SetPublic from '../../components/Set-Public/Set-Public';

export default class ShareSetPage extends Component {

  static contextType = UserContext;  

  state = {
    set: []
  }

  componentDidMount() {
    apiService.getSingleSet(this.props.match.params.team_id, this.props.match.params.set_id) // Get the single public set!
      .then(data => {
        this.setState({set: data})
      })
  }

  render() {

    // const {publicSets} = this.context;
    // const set = publicSets.filter(set => Number(set.id) === Number(this.props.match.params.set_id))

    return (
      <div>
      { this.state.set[0] ? <SetPublic set={this.state.set[0]}/> : <h3>This set seems to not exist anymore</h3>}
      </div>
    );
  };
};

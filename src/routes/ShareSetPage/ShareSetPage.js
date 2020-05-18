import React, { Component } from 'react';
import SetPublic from '../../components/Set-Public/Set-Public';

export default class ShareSetPage extends Component {
  render() {
    return (
      <div>
        {<SetPublic/> || <p>It seems this set no longer exists.</p>}
      </div>
    );
  };
};

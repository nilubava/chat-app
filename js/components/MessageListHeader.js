import {IndexLink, Link} from 'react-router';

import React from 'react';
import Relay from 'react-relay';

class MessageListHeader extends React.Component {
  render() {
    const numTotalMessages = this.props.viewer.totalCount;
    return (
      <div className="header">
        <span className="message-count">
          <strong>{numTotalMessages}</strong> message{numTotalMessages === 1 ? '' : 's'}
        </span>
      </div>
    );
  }
}

export default Relay.createContainer(MessageListHeader, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount
      }
    `,
  },
});

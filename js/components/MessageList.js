import Message from './Message';

import React from 'react';
import Relay from 'react-relay';

class MessageList extends React.Component {
  _scrollToNewChat() {
    setTimeout(function() {
      var list = document.getElementById('chatlist');
      list.scrollTop = list.scrollHeight - list.clientHeight;
    }, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.viewer.totalCount < this.props.viewer.totalCount) {
      this._scrollToNewChat();
    }
  }
  renderMessages() {
    return this.props.viewer.messages.edges.map(edge =>
      <Message
        key={edge.node.id}
        message={edge.node}
        viewer={this.props.viewer}
      />
    );
  }
  render() {
    const numMessages = this.props.viewer.totalCount;
    return (
      <section className="main" id='chatlist'>
        <ul className="message-list">
          {this.renderMessages()}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(MessageList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        messages(
          first: 2147483647  # max GraphQLInt
        ) {
          edges {
            node {
              id,
              ${Message.getFragment('message')},
            },
          },
        },
        totalCount,
        ${Message.getFragment('viewer')},
      }
    `,
  },
});

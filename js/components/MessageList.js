import Message from './Message';
import ReactDOM from 'react-dom';

import React from 'react';
import Relay from 'react-relay';

class MessageList extends React.Component {
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight - node.clientHeight;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.viewer.totalCount < this.props.viewer.totalCount) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight - node.clientHeight;
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
      <section className="main">
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

import AddMessageMutation from '../mutations/AddMessageMutation';
import MessageListHeader from './MessageListHeader';
import MessageTextInput from './MessageTextInput';

import React from 'react';
import Relay from 'react-relay';

class MessageApp extends React.Component {
  _handleTextInputSave = (text) => {
    this.props.relay.commitUpdate(
      new AddMessageMutation({text, viewer: this.props.viewer})
    );
  };
  render() {
    return (
      <div>
        <section className="chatapp">
          <h1>
            chatUp
          </h1>
          <MessageListHeader
            messages={this.props.viewer.messages}
            viewer={this.props.viewer}
          />
          {this.props.children}

          <div className="footer">
            <MessageTextInput
              autoFocus={true}
              className="new-message"
              onSave={this._handleTextInputSave}
              placeholder="Enter message..."
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Relay.createContainer(MessageApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        gravatar,
        totalCount,
        ${AddMessageMutation.getFragment('viewer')},
        ${MessageListHeader.getFragment('viewer')},
      }
    `,
  },
});

import RemoveMessageMutation from '../mutations/RemoveMessageMutation';
import EditMessageMutation from '../mutations/EditMessageMutation';
import MessageTextInput from './MessageTextInput';

import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';

class Message extends React.Component {
  state = {
    isEditing: false,
  };

  _handleDestroyClick = () => {
    this._removeMessage();
  };
  _handleEditClick = () => {
    this._setEditMode(true);
  };
  _handleTextInputCancel = () => {
    this._setEditMode(false);
  };
  _handleTextInputDelete = () => {
    this._setEditMode(false);
    this._removeMessage();
  };
  _handleTextInputSave = (text) => {
    this._setEditMode(false);
    this.props.relay.commitUpdate(
      new EditMessageMutation({message: this.props.message, text})
    );
  };
  _removeMessage() {
    this.props.relay.commitUpdate(
      new RemoveMessageMutation({message: this.props.message, viewer: this.props.viewer})
    );
  }
  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit});
  };
  renderTextInput() {
    return (
      <div>
        <label>
          <MessageTextInput
            className="edit"
            commitOnBlur={false}
            initialValue={this.props.message.text}
            onCancel={this._handleTextInputCancel}
            onDelete={this._handleTextInputDelete}
            onSave={this._handleTextInputSave}
          />
        </label>
        <div className="action-buttons">
          <button
            className="delete"
            onClick={this._handleTextInputCancel}>
            <i className="ion-android-close"></i>
          </button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <li
        className={classnames({
          editing: this.state.isEditing,
        })}>
        <img src={this.props.viewer.gravatar}/>
        <div className="chat-bubble">
          <div className="view">
            <label>
              {this.props.message.text}
            </label>
            <div className="action-buttons">
              <button
                className="delete"
                onClick={this._handleDestroyClick}>
                <i className="ion-ios-trash-outline"></i>
              </button>
              <button
                className="modify"
                onClick={this._handleEditClick}>
                <i className="ion-edit"></i>
              </button>
            </div>
          </div>

          {this.state.isEditing && this.renderTextInput()}

        </div>
        <span>{this.props.message.timestamp}</span>
      </li>
    );
  }
}

export default Relay.createContainer(Message, {
  fragments: {
    message: () => Relay.QL`
      fragment on Message {
        id,
        text,
        timestamp,
        ${RemoveMessageMutation.getFragment('message')},
        ${EditMessageMutation.getFragment('message')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        gravatar,
        ${RemoveMessageMutation.getFragment('viewer')},
      }
    `,
  },
});

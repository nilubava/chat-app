import Relay from 'react-relay';

export default class EditMessageMutation extends Relay.Mutation {
  static fragments = {
    message: () => Relay.QL`
      fragment on Message {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{editMessage}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on EditMessagePayload @relay(pattern: true) {
        message {
          text,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        message: this.props.message.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.message.id,
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      message: {
        id: this.props.message.id,
        text: this.props.text,
      },
    };
  }
}

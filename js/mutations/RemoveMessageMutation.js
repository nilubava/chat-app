import Relay from 'react-relay';

export default class RemoveMessageMutation extends Relay.Mutation {
  static fragments = {
    message: () => Relay.QL`
      fragment on Message {
        id,
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeMessage}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveMessagePayload @relay(pattern: true) {
        deletedMessageId,
        viewer {
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'messages',
      deletedIDFieldName: 'deletedMessageId',
    }];
  }
  getVariables() {
    return {
      id: this.props.message.id,
    };
  }
  getOptimisticResponse() {
    const viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.totalCount != null) {
      viewerPayload.totalCount = this.props.viewer.totalCount - 1;
    }
    return {
      deletedMessageId: this.props.message.id,
      viewer: viewerPayload,
    };
  }
}

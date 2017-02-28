import Relay from 'react-relay';

export default class AddMessageMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{addMessage}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddMessagePayload @relay(pattern: true) {
        messageEdge,
        viewer {
          messages,
          totalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'messages',
      edgeName: 'messageEdge',
      rangeBehaviors: () => {
        return 'append';
      },
    }];
  }
  getVariables() {
    return {
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      messageEdge: {
        node: {
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
        totalCount: this.props.viewer.totalCount + 1,
      },
    };
  }
}

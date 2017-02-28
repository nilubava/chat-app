import Moment from 'moment';

export class Message {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'user_id';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
viewer.gravatar = 'https://randomuser.me/api/portraits/women/47.jpg';
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock messages
const messagesById = {};
const messageIdsByUser = {
  [VIEWER_ID]: [],
};

let nextMessageId = 0;

export function addMessage(text) {
  const message = new Message();
  message.id = `${nextMessageId++}`;
  message.text = text;
  message.timestamp = Moment(new Date()).format("MM/DD/YYYY HH:mm").toString();
  messagesById[message.id] = message;
  messageIdsByUser[VIEWER_ID].push(message.id);
  return message.id;
}

export function getMessage(id) {
  return messagesById[id];
}

export function getMessages() {
  const messages = messageIdsByUser[VIEWER_ID].map(id => messagesById[id]);
  return messages;
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

export function removeMessage(id) {
  const messageIndex = messageIdsByUser[VIEWER_ID].indexOf(id);
  if (messageIndex !== -1) {
    messageIdsByUser[VIEWER_ID].splice(messageIndex, 1);
  }
  delete messagesById[id];
}

export function editMessage(id, text) {
  const message = getMessage(id);
  message.text = text;
}

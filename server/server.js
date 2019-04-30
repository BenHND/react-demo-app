const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

/**
 * Store
 */

// users: [
//   {
//     id: 1,
//     username: '',
//     login: '',
//     password: '',
//     avatar: '',
//     conversationId: [1,2,3]
//   }
// ]

// conversation: [
//   {
//     id: 1,
//     authorId: 1,
//     authorImg: '01.jpg' 
//     publicMessage: true,
//     title: '',
//     messageId: [1, 2, 3]
//     userId: [1,2]
//   }
// ]

// messages: [
//   {
//     id: 1,
//     authorName: ,
//     authorImg: ,
//     authorId: 1,
//     text: ''
//   }
// ]

var userId = 1;
const getUserId = () => userId++;

var conversationId = 1;
const getConversationId = () => conversationId++;

var messageId = 1;
const getMessageId = () => messageId++;

var USERS = [];
var CONVERSATIONS = [];
var MESSAGES = [];

const createUser = (attrs) => {
  var user = Object.assign({}, attrs, { id: getUserId() });
  USERS.push(user);
  return user;
};

const createConversation = (attrs) => {
  var conversation = Object.assign({}, attrs, { id: getConversationId() });
  CONVERSATIONS.push(conversation);
  return conversation;
};

const createMessage = (attrs) => {
  var message = Object.assign({}, attrs, { id: getMessageId() });
  MESSAGES.unshift(message);
  return message;
};

const getUser = id => USERS.filter(user => user.id === id);
const getConversation = id => CONVERSATIONS.filter(conversation => conversation.id === id);
const getPublicConversations = () => CONVERSATIONS.filter(conversation => conversation.publicMessage === true);
const getUserConversations = idList => CONVERSATIONS.filter(conversation => conversation.publicMessage === true || idList.indexOf(conversation.id) >= 0);
const getConversationMessages = idList => MESSAGES.filter(message => idList.indexOf(message.id) >= 0).reverse();

/**
 * Initial datas
 */

createUser({ username: 'John', login: 'john', password: 'john', avatar: '03.jpg', conversationId: [1, 2, 3, 4] });
createUser({ username: 'Jane', login: 'jane', password: 'jane', avatar: '02.jpg', conversationId: [2, 4] });
createUser({ username: 'Jack', login: 'jack', password: 'jack', avatar: '05.jpg', conversationId: [2, 4] });
createUser({ username: 'Jade', login: 'jade', password: 'jade', avatar: '04.jpg', conversationId: [1, 2, 3, 4] });
createUser({ username: 'June', login: 'june', password: 'june', avatar: '01.jpg', conversationId: [1, 2, 4] });

createConversation({ time: 'one day ago', authorId: 5, authorName: 'June', authorImg: '01.jpg', membersImg: ['03.jpg', '04.jpg'], publicMessage: false, title: 'Today\'s program', messageId: [7, 8], usersId: [1, 4, 5] });
createConversation({ time: 'one hour ago', authorId: 3, authorName: 'Jack', authorImg: '05.jpg', membersImg: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'], publicMessage: true, title: 'A new project', messageId: [6], usersId: [1, 2, 3, 4, 5] });
createConversation({ time: '30 minutes ago', authorId: 4, authorName: 'Jade', authorImg: '04.jpg', membersImg: ['03.jpg'], publicMessage: false, title: 'How are you ?', messageId: [5], usersId: [1, 4] });
createConversation({ time: 'ten minutes ago', authorId: 1, authorName: 'John', authorImg: '03.jpg', membersImg: ['05.jpg', '02.jpg', '01.jpg'], publicMessage: true, title: 'Hi guys', messageId: [4, 3, 2, 1], usersId: [1, 2, 3, 5] });

createMessage({ authorName: 'June', authorImg: '01.jpg', text: 'Mauris et elit non felis aliquet volutpat sed nec dolor.' });
createMessage({ authorName: 'Jack', authorImg: '05.jpg', text: 'Dapibus tincidunt, augue tortor posuere est, ut dictum sapien magna ac eros.' });
createMessage({ authorName: 'Jane', authorImg: '02.jpg', text: 'In venenatis sit amet diam vel vehicula. Fusce convallis, nisl id' });
createMessage({ authorName: 'John', authorImg: '03.jpg', text: 'Proin aliquam ex vitae finibus cursus. Donec sit amet nisl ' });
createMessage({ authorName: 'Jade', authorImg: '04.jpg', text: 'Hello John, how are you today ?' });
createMessage({ authorName: 'Jack', authorImg: '05.jpg', text: ' Nam ut massa sagittis, eleifend dolor sed, efficitur erat.' });
createMessage({ authorName: 'Jade', authorImg: '04.jpg', text: 'malesuada sollicitudin. Nulla non quam in eros efficitur condimentum ac id felis.' });
createMessage({ authorName: 'June', authorImg: '01.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non velit vitae neque' });

/**
 * API
 */

const authenticateLogin = payload => {
  let user = USERS.filter(user => user.login === payload.username)[0];
  return (user && user.password === payload.password) ? user : false;
};

const userConversations = payload => {
  return payload.length ? getUserConversations(payload).reverse() : getPublicConversations().reverse();
}

const getConversationById = id => {
  let conversation = getConversation(+id)[0];
  return getConversationMessages(conversation.messageId);
}

const postMessage = payload => {
  let newMessage = createMessage(payload.message);
  let conversation = getConversation(+payload.conversationId);
  conversation[0].messageId.push(newMessage.id);
  return newMessage;
}

const createNewConversation = payload => {

  const usersId = [];
  const usersImg = [];

  const users = payload.users.forEach(user => {
    if (payload.user.id !== user.id) {
      usersId.push(user.id);
      usersImg.push(user.avatar);
    }
  });

  let conversation = {
    title: payload.title,
    usersId: userId,
    membersImg: usersImg,
    publicMessage: payload.publicMessage,
    time: '1 minute ago',
    authorId: payload.user.id,
    authorName: payload.user.username,
    authorImg: payload.user.avatar,
    messageId: []
  }

  const newConversation = createConversation(conversation);

  usersId.push(payload.user.id);
  usersId.forEach(id => {
    USERS.forEach(USER => {
      if (id === USER.id) {
        USER.conversationId.push(newConversation.id);
      }
    });
  });
  return newConversation;
}

/**
 * Routes
 */


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/users')
  .get((req, res) => res.status(200).json(USERS));

router.route('/login')
  .post((req, res) => res.status(200).json(authenticateLogin(req.body)));

router.route('/conversations')
  .post((req, res) => res.status(200).json(userConversations(req.body)));

router.route('/conversation/:id')
  .get((req, res) => res.status(200).json(getConversationById(req.params.id)));

router.route('/conversation/:id/messages')
  .post((req, res) => res.status(200).json(postMessage(req.body)));

router.route('/create')
  .post((req, res) => res.status(200).json(createNewConversation(req.body)));

app
  .use(bodyParser.json())
  .use('/api', router).listen(9876);
import React, { memo, Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Websocket from 'react-websocket';
import MessageView from './MessageView';
import messageTypes from './MessageTypes';

const defaultWebsocketUrl = 'ws://localhost:8080';

const parseFromMessage = ({ accountName, accountId, message, link, type }) => ({
  message,
  link,
  accountName,
  accountId,
  isUser: type === messageTypes.user,
  isClient: type === messageTypes.client,
  isLink: type === messageTypes.link,
  type
});

const parseToMessage = ({message, accountId, type, accountName}) => ({
  message,
  accountId,
  type: type || messageTypes.client,
  name: 'ADD-MESSAGE',
  accountName
});

const sendMessageToWebsocket = (websocket, object) => {
  const strObj = JSON.stringify(object);
  websocket.current.sendMessage(strObj);
};

const ChatWidgetContainer = memo(({ websocketUrl }) => {
  const websocket = useRef(null);

  const [stateMessagesQueue, setMessages] = useState([]);

  const handleOpen = () => {
    sendMessageToWebsocket(websocket, { name: 'GET-ALL-MESSAGES-CLIENT' });
  };

  const handleData = (data = '') => {
    const newMessages = JSON.parse(data) || [];
    if(newMessages.data && newMessages.name === 'GET-ALL-MESSAGES-CLIENT-SUCCEEDED'){
      setMessages([...newMessages.data.map(message => parseFromMessage(message))]);
    }
  };

  const onNewMessages = (message, accountId, accountName) => {
    sendMessageToWebsocket(websocket, parseToMessage({message, accountId, type: messageTypes.client, accountName}));
  };

  return (
    <Fragment>
      <Websocket url={websocketUrl} ref={websocket} onMessage={handleData} onOpen={handleOpen} />
      <MessageView messages={stateMessagesQueue} onNewMessages={onNewMessages}></MessageView>
    </Fragment>
  );
});

ChatWidgetContainer.propTypes = {
  websocketUrl: PropTypes.string,
};

ChatWidgetContainer.defaultProps = {
  websocketUrl: defaultWebsocketUrl,
};

export default ChatWidgetContainer;

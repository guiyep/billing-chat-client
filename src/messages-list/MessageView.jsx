import React, { memo, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ChatWidget = memo(({ messages, onNewMessages }) => {

  const accountNames = messages.reduce((acc, {accountName, accountId}) => {
    acc[accountName] = accountId;
    return acc;
  }, {})

  const accountIdsToName = messages.reduce((acc, {accountName, accountId}) => {
    acc[accountId] = accountName;
    return acc;
  }, {})

  const accountNamesKeys = Object.keys(accountNames);

  const [message, setMessage] = useState(null);
  const [accountId, setAccountId] = useState(accountNames[accountNamesKeys[0]]);

  const onChange =(e) => {
    const target = e.currentTarget;
    if(target.name === 'message'){
      setMessage(target.value);
    }
    if(target.name === 'account'){
      setAccountId(accountNames[target.value]);
    }
  }

  const onNewMessagesHandler = () => {
    const accountIdToSave = accountId || accountNames[accountNamesKeys[0]];
    onNewMessages(message, accountIdToSave, accountIdsToName[accountIdToSave]);
    setMessage('');
  }

  return <Fragment>
      <div className="table-container">
        <table className="table-messages">
          <thead>
            <tr>
              <th>
                Account Name
              </th>
              <th>
                message
              </th>
            </tr>
          </thead>
          <tbody>
          {
            messages.map((msg, index) => <tr key={index}>
              <td>{msg.accountName}</td>
              <td>{msg.message}</td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    <div>
      <input name="message" type="text" value={message} onChange={onChange}></input>
      <select name="account" onChange={onChange}>
        {accountNamesKeys.map((name) => <option key={name} value={name}>{name}</option>)}
      </select>
      <button onClick={onNewMessagesHandler}>Send Message</button>
    </div>
  </Fragment>
});

ChatWidget.propTypes = {
  messages: PropTypes.array.isRequired,
  onNewMessages: PropTypes.func.isRequired,
};

export default ChatWidget;

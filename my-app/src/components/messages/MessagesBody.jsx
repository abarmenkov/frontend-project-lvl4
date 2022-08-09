import { useSelector } from 'react-redux';
import React from 'react';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';

const MessagesBody = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter((item) => item.channelId === currentChannelId);

  return (
    <div className="p-3 h-100 overflow-auto">
      {currentChannelMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesBody;

import { useSelector } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';

const MessagesHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });

  const { currentChannel, currentChannelId } = useSelector((state) => {
    const channelsState = channelsSelectors.selectAll(state);
    const currentChannelIdState = state.channels.currentChannelId;
    const currentChannelState = channelsState.find(({ id }) => id === currentChannelIdState);
    return { currentChannel: currentChannelState, currentChannelId: currentChannelIdState };
  });

  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter((item) => item.channelId === currentChannelId);

  return (
    <div
      className="bg-light py-4 px-3 shadow-sm small"
    >

      <p
        className="m-0"
      >
        <b>
          #
          {' '}
          {currentChannel ? currentChannel.name : null}
        </b>
      </p>

      <span
        className="text-muted"
      >
        {t('messages', { count: currentChannelMessages.length })}
      </span>
    </div>
  );
};

export default MessagesHeader;

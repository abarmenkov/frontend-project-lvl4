import React, { useEffect, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import { GrEmoji } from 'react-icons/gr';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useChatApi from '../../hooks/useChatApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const MessagesBody = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const { getUsername } = useAuth();
  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelId = useSelector((state) => state.channels.currentChannelId);
  const { sendNewMessage } = useChatApi();
  const username = getUsername();
  const outgoingMessage = {
    body: filter.clean(message),
    username,
    channelId,
  };
  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      setMessage('');
    } else {
      toast.error(t('networkError'), {
        position: 'top-center',
      });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendNewMessage(outgoingMessage, apiResponseHandle);
    setShowEmoji(false);
  };

  const handleEmojiShow = () => {
    setShowEmoji((v) => !v);
  };

  const handleEmojiSelect = (e) => {
    setMessage(message + e.native);
  };

  return (
    <div className="p-3">
      <Form
        onSubmit={onFormSubmit}
        className="d-flex flex-column"
      >
        <div className="d-flex">
        <Button variant='primary' type='button' onClick={handleEmojiShow}>
            <GrEmoji />
          </Button>
          <FloatingLabel label={t('placeholder')} controlId="message" className="w-100">
            <Form.Control
              ref={inputRef}
              type="text"
              name="message"
              aria-label={t('ariaLabel')}
              required
              placeholder={t('placeholder')}
              value={message}
              onChange={messageHandler}
            />
          </FloatingLabel>
          <Button variant='success' type="submit">
            <FiSend />
          </Button>

          {/* <Button
            variant="primary"
            type="submit"
            className="mx-1"
          >
            {t('addButton')}
  </Button> */}
        </div>
      </Form>
      {showEmoji && <Picker data={data} categories={['frequent', 'people', 'nature']} previewPosition={'none'} searchPosition={'none'} onEmojiSelect={handleEmojiSelect} emojiSize={15} />}
    </div>
  );
};

export default MessagesBody;

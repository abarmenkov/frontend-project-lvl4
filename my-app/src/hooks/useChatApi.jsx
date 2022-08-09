import {
  useContext,
} from 'react';
import socketContext from '../contexts/ChatContext.js';

const useChatApi = () => useContext(socketContext);

export default useChatApi;

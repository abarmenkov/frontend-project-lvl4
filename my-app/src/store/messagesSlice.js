import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import fetchData from '../api/fetchData.js';
import {
  removeChannel,
} from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(removeChannel, (state, action) => {
        const removedChannelId = action.payload;
        const entities = Object.values(state.entities);
        const restEntities = entities.filter((e) => e.channelId !== removedChannelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});
export const {
  addMessage,
} = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

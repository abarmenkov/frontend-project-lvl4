import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import fetchData from '../api/fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, {
        payload,
      }) => {
        channelsAdapter.addMany(state, payload.channels);
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const {
  changeChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import moment from 'moment';

moment.locale('en', {
  week: {
    dow: 1, // set Monday is the first day of the week.
  },
});

// -- CONSTANT
const initialState = {
  eventData: {
    all: [],
    today: [],
    week: [],
    later: [],
  },
  status: {
    eventData: 'idle',
  },
  error: {
    eventData: '',
  },
};

// -- ASYNC ACTIONS
export const fetchEvent = createAsyncThunk('event/fetchEvent', async () => {
  const requestUrl = '/api/event';

  if (!requestUrl) {
    return null;
  }

  const response = await Axios.get(requestUrl);
  return response;
});

// -- MAIN SLICE
export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEventSlice: state => {
      state.eventData = [];
      state.status.eventData = 'idle';
      state.error.eventData = '';
    },
  },
  extraReducers: {
    [fetchEvent.pending]: state => {
      state.status.eventData = 'loading';
    },
    [fetchEvent.fulfilled]: (state, action) => {
      state.status.eventData = 'succeeded';
      state.eventData.all = action.payload.data;

      state.eventData.today = action.payload.data.filter(event =>
        moment(event.dateTime).isSame(moment(), 'day'),
      );
      state.eventData.week = action.payload.data.filter(
        event =>
          moment(event.dateTime).isSame(moment(), 'week') &&
          moment(event.dateTime).isSame(moment(), 'day') === false,
      );
      state.eventData.later = action.payload.data.filter(
        event =>
          moment(event.dateTime).isSame(moment(), 'day') === false &&
          moment(event.dateTime).isSame(moment(), 'week') === false,
      );
    },
    [fetchEvent.rejected]: (state, action) => {
      state.status.eventData = 'failed';
      state.error.eventData = action.error.message;
    },
  },
});

// -- EXPORT ACTIONS
export const {resetEventSlice} = eventSlice.actions;

export default eventSlice.reducer;

export const selectEventDataStatus = state => state.event.status.eventData;
export const selectEventData = state => state.event.eventData;

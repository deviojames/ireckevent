import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';

// -- CONSTANT
const initialState = {
  eventData: [],
  selectedEventData: {},
  status: {
    eventData: 'idle',
    selectedEventData: 'idle',
  },
  error: {
    eventData: '',
    selectedEventData: '',
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

export const fetchSelectedEvent = createAsyncThunk(
  'event/fetchSelectedEvent',
  async ({eventId}) => {
    const requestUrl = `/api/event/${eventId}`;

    if (!requestUrl) {
      return null;
    }

    const response = await Axios.get(requestUrl);
    return response;
  },
);

export const fetchJoinEvent = createAsyncThunk(
  'event/fetchJoinEvent',
  async ({eventId}) => {
    const requestUrl = `/api/event/${eventId}/join`;

    if (!requestUrl) {
      return null;
    }

    const response = await Axios.get(requestUrl);
    return response;
  },
);

export const fetchLeaveEvent = createAsyncThunk(
  'event/fetchLeaveEvent',
  async ({eventId}) => {
    const requestUrl = `/api/event/${eventId}/join`;

    if (!requestUrl) {
      return null;
    }

    const response = await Axios.get(requestUrl);
    return response;
  },
);

// -- MAIN SLICE
export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEventSlice: state => {
      state.eventData = {
        all: [],
        today: [],
        week: [],
        later: [],
      };
      state.status.eventData = 'idle';
      state.error.eventData = '';
    },
    resetSelectedEventData: state => {
      state.selectedEventData = [];
      state.status.selectedEventData = 'idle';
      state.error.selectedEventData = '';
    },
  },
  extraReducers: {
    [fetchEvent.pending]: state => {
      state.status.eventData = 'loading';
    },
    [fetchEvent.fulfilled]: (state, action) => {
      state.status.eventData = 'succeeded';
      state.eventData = action.payload.data;
    },
    [fetchEvent.rejected]: (state, action) => {
      state.status.eventData = 'failed';
      state.error.eventData = action.error.message;
    },
    [fetchSelectedEvent.pending]: (state, action) => {
      state.status.selectedEventData = 'loading';
    },
    [fetchSelectedEvent.fulfilled]: (state, action) => {
      state.status.selectedEventData = 'succeeded';
      state.selectedEventData = action.payload.data.event;
    },
    [fetchSelectedEvent.rejected]: (state, action) => {
      state.status.selectedEventData = 'failed';
      state.error.selectedEventData = action.error.message;
    },
    [fetchJoinEvent.pending]: (state, action) => {},
    [fetchJoinEvent.fulfilled]: (state, action) => {},
    [fetchJoinEvent.rejected]: (state, action) => {},
    [fetchLeaveEvent.pending]: (state, action) => {},
    [fetchLeaveEvent.fulfilled]: (state, action) => {},
    [fetchLeaveEvent.rejected]: (state, action) => {},
  },
});

// -- EXPORT ACTIONS
export const {resetEventSlice} = eventSlice.actions;

export default eventSlice.reducer;

export const selectEventDataStatus = state => state.event.status.eventData;
export const selectEventData = state => state.event.eventData;
export const selectSelectedEventDataStatus = state =>
  state.event.status.eventData;
export const selectSelectedEventData = state => state.event.selectedEventData;

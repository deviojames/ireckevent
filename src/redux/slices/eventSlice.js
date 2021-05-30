import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from 'axios';
import moment from 'moment';

// -- CONSTANT
const initialState = {
  eventData: [],
  selectedEventData: {},
  status: {
    eventData: 'idle',
    selectedEventData: 'idle',
    joinEvent: 'idle',
    leaveEvent: 'idle',
  },
  error: {
    eventData: '',
    selectedEventData: '',
    joinEvent: '',
    leaveEvent: '',
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

    const response = await Axios.patch(requestUrl);

    return response;
  },
);

export const fetchLeaveEvent = createAsyncThunk(
  'event/fetchLeaveEvent',
  async ({eventId}) => {
    const requestUrl = `/api/event/${eventId}/leave`;

    if (!requestUrl) {
      return null;
    }

    const response = await Axios.patch(requestUrl);

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
      // sort event data by date
      state.eventData = action.payload.data.sort(
        (a, b) =>
          moment(a.dateTime).format('YYYYMMDD') -
          moment(b.dateTime).format('YYYYMMDD'),
      );
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
    [fetchJoinEvent.pending]: (state, action) => {
      state.status.joinEvent = 'loading';
    },
    [fetchJoinEvent.fulfilled]: (state, action) => {
      state.status.joinEvent = 'succeeded';
      // replace event data from response
      const replacedData = state.eventData.map(event => {
        if (event.id === action.payload.data.id) {
          return action.payload.data;
        }
        return event;
      });

      state.eventData = replacedData;
      state.selectedEventData = action.payload.data;
    },
    [fetchJoinEvent.rejected]: (state, action) => {
      state.status.joinEvent = 'failed';
      state.error.joinEvent = action.error.message;
    },
    [fetchLeaveEvent.pending]: (state, action) => {
      state.status.leaveEvent = 'loading';
    },
    [fetchLeaveEvent.fulfilled]: (state, action) => {
      state.status.leaveEvent = 'succeeded';
      // replace event data from response
      const replacedData = state.eventData.map(event => {
        if (event.id === action.payload.data.id) {
          return action.payload.data;
        }
        return event;
      });

      state.eventData = replacedData;
      state.selectedEventData = action.payload.data;
    },
    [fetchLeaveEvent.rejected]: (state, action) => {
      state.status.leaveEvent = 'failed';
      state.error.leaveEvent = action.error.message;
    },
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

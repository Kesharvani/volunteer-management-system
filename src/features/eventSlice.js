import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvent = createAsyncThunk("event/fetchEvent", async () => {
  const event = await axios.get(
    "https://volunteer-management-system-assignment22.allahabad.repl.co/event"
  );
  return event.data.event;
});

export const addEvent = createAsyncThunk("event/addEvent", async (newWard) => {
  const event = await axios.post(
    "https://volunteer-management-system-assignment22.allahabad.repl.co/event",
    newWard
  );
  return event.data.event;
});

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, updatedWard }) => {
    const event = await axios.put(
      `https://volunteer-management-system-assignment22.allahabad.repl.co/event/${id}`,
      updatedWard
    );
    return event.data.event;
  }
);

export const deleteEvent = createAsyncThunk("event/deleteEvent", async (id) => {
  const event = await axios.delete(
    `https://volunteer-management-system-assignment22.allahabad.repl.co/event/${id}`
  );
  return event.data.event;
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [fetchEvent.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    },
    [addEvent.pending]: (state) => {
      state.status = "loading";
    },
    [addEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateEvent.fulfilled]: (state, action) => {
      const updateEvent = action.payload;
      state.status = "success";
      const index = state.events.findIndex(
        (item) => item._id === updateEvent._id
      );
      if (index !== -1) {
        state.events[index] = updateEvent;
      }
    },
    [updateEvent.pending]: (state) => {
      state.status = "loading";
    },
    [updateEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action?.payload?._id
      );
    },
    [deleteEvent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default eventSlice.reducer;

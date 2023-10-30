import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
};

export const fetchVolunteer = createAsyncThunk(
  "volunteer/fetchVolunteer",
  async () => {
    const volunteer = await axios.get(
      "https://volunteer-management-system-assignment22.allahabad.repl.co/volunteer"
    );
    return volunteer.data.volunteer;
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteer/addVolunteer",
  async (newPatient) => {
    const volunteer = await axios.post(
      "https://volunteer-management-system-assignment22.allahabad.repl.co/volunteer",
      newPatient
    );
    return volunteer.data.volunteer;
  }
);

export const updateVolunteer = createAsyncThunk(
  "volunteer/updateVolunteer",
  async ({ id, updatedPatient }) => {
    const volunteer = await axios.put(
      `https://volunteer-management-system-assignment22.allahabad.repl.co/volunteer/${id}`,
      updatedPatient
    );
    return volunteer.data.volunteer;
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteer/deleteVolunteer",
  async (id) => {
    const volunteer = await axios.delete(
      `https://volunteer-management-system-assignment22.allahabad.repl.co/volunteer/${id}`
    );
    return volunteer.data.volunteer;
  }
);

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [fetchVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    },
    [addVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateVolunteer.fulfilled]: (state, action) => {
      const updateVolunteer = action.payload;
      state.status = "success";
      const index = state.volunteers.findIndex(
        (item) => item._id === updateVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updateVolunteer;
      }
    },
    [updateVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action?.payload?._id
      );
    },
    [deleteVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default volunteerSlice.reducer;

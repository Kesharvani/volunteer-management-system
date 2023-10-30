import { configureStore } from "@reduxjs/toolkit";
import volunteerSlice from "./features/volunteerSlice";
import eventSlice from "./features/eventSlice";
const store = configureStore({
  reducer: {
    volunteer: volunteerSlice,
    event: eventSlice,
  },
});

export default store;

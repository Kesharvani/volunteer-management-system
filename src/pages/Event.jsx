import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EventModal from "../common/EventModal";
import { fetchEvent } from "../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Event() {
  const eventsData = useSelector((state) => state?.event?.events);
  const status = useSelector((state) => state?.event?.status);
  const error = useSelector((state) => state?.event?.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchEvent());
  }, [status, dispatch]);
  console.log("event data", eventsData);
  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {error === "error" && <div>Error:{error}</div>}
      <ul>
        {eventsData.map((event) => {
          return (
            <li key={event._id}>
              <Link to={`/event/${event._id}`}>{event.name}</Link>
            </li>
          );
        })}
      </ul>
      <EventModal />
    </div>
  );
}

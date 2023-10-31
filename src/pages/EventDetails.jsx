import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventModal from "../common/EventModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../features/eventSlice";
export default function EventDetails() {
  const eventsData = useSelector((state) => state?.event?.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentEvent = eventsData.find((event) => event._id === id);
  const deleteHandler = (id) => {
    dispatch(deleteEvent(id));
    navigate("/event");
  };
  return (
    <div>
      <p>Event Name:{currentEvent?.name}</p>
      <p>Date:{currentEvent?.date}</p>
      <p>location:{currentEvent?.location}</p>
      <p>Description:{currentEvent?.description}</p>
      <p>
        {currentEvent?.numberOfVolunteerWithRole?.map((item) => {
          return (
            <li>
              Role Name:{item?.roleName}, Role Required:
              {item?.requiredVolunteers}
            </li>
          );
        })}
      </p>

      <EventModal event={currentEvent} />
      <button onClick={() => deleteHandler(currentEvent?._id)}>Delete</button>
    </div>
  );
}

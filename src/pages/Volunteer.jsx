import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VolunteerModal from "../common/VolunteerModal";
import { fetchVolunteer } from "../features/volunteerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Volunteer() {
  const status = useSelector((state) => state.volunteer.status);
  const volunteerData = useSelector((state) => state.volunteer.volunteers);
  const error = useSelector((state) => state.volunteer.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchVolunteer());
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error:{error}</div>}
      <ul>
        {volunteerData?.map((volunteer) => {
          return (
            <li key={volunteer._id}>
              <Link to={`volunteer/${volunteer._id}`}>{volunteer.name}</Link>
            </li>
          );
        })}
      </ul>
      <VolunteerModal />
    </div>
  );
}

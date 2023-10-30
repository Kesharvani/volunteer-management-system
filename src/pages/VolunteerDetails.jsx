import React from "react";
import { useParams } from "react-router-dom";
import VolunteerModal from "../common/VolunteerModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteVolunteer } from "../features/volunteerSlice";
import { useNavigate } from "react-router-dom";
export default function VolunteerDetails() {
  const volunteerData = useSelector((state) => state.volunteer.volunteers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentVolunteer = volunteerData.find(
    (volunteer) => volunteer._id === id
  );
  if (!currentVolunteer) {
    return <div>volunteer not found</div>;
  }
  const deleteHandler = (id) => {
    dispatch(deleteVolunteer(id));
    navigate("/");
  };
  return (
    <div>
      <h2>volunteer Details</h2>
      <p>Name:{currentVolunteer?.name}</p>
      <p>Contact:{currentVolunteer?.contact}</p>
      <p>
        Skills:
        {currentVolunteer.skills.map((volunteer, index) => {
          return <li key={index}>{volunteer}</li>;
        })}
      </p>
      <p>
        Area of Interest:
        {currentVolunteer.areaOfInterest.map((interest, index) => {
          return <li key={index}>{interest}</li>;
        })}
      </p>
      <p>availibility:{currentVolunteer.availibility}</p>
      <VolunteerModal volunteer={currentVolunteer} />
      <button onClick={() => deleteHandler(currentVolunteer?._id)}>
        Delete
      </button>
    </div>
  );
}

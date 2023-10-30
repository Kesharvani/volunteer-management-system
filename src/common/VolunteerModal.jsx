// import "./VolunteerModal.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { addVolunteer, updateVolunteer } from "../features/volunteerSlice";
import { useDispatch } from "react-redux";
export default function VolunteerModal(props) {
  const dispatch = useDispatch();
  const volunteer = props.volunteer ? props.volunteer : null;
  const [newVolunteer, setNewVolunteer] = useState({
    name: volunteer ? volunteer.name : "",
    contact: volunteer ? volunteer.contact : "",
    skills: volunteer ? volunteer.skills : [],
    availibility: volunteer ? volunteer.availibility : "",
    areaOfInterest: volunteer ? volunteer.areaOfInterest : [],
  });
  const [arrayData, setArrayData] = useState({
    skills: "",
    areaOfInterest: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  // open modal
  function openModal() {
    setIsOpen(true);
  }

  // close modal
  function closeModal() {
    setIsOpen(false);
  }

  // style for modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // for all other handler except skills and area of interest
  const formChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewVolunteer((prev) => ({ ...prev, [name]: value }));
  };
  // for skills and area of interest
  const skillChangeHandler = (e) => {
    console.log("inside handler");
    const { name, value } = e.target;
    setArrayData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (volunteer) {
      dispatch(
        updateVolunteer({ id: volunteer._id, updatedPatient: newVolunteer })
      );
    } else {
      dispatch(addVolunteer(newVolunteer));
    }
    closeModal();
  };

  // add skill handler
  const addSkill = () => {
    setNewVolunteer((prev) => ({
      ...prev,
      skills: [...prev.skills, arrayData.skills],
    }));
    setArrayData((prev) => ({ ...prev, skills: "" }));
  };
  // add area of interest handler
  const addInterest = () => {
    setNewVolunteer((prev) => ({
      ...prev,
      areaOfInterest: [...prev.areaOfInterest, arrayData.areaOfInterest],
    }));
    setArrayData((prev) => ({ ...prev, areaOfInterest: "" }));
  };

  return (
    <div>
      <button onClick={openModal}>
        {volunteer ? "Update" : "Add"} Volunteer
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <AiFillCloseCircle
          size={32}
          onClick={() => closeModal()}
          className="close-icon"
        />
        <form onSubmit={submit}>
          <div className="field-style">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              onChange={formChangeHandler}
              value={newVolunteer.name}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="contact">Contact</label>
            <input
              type="string"
              name="contact"
              onChange={formChangeHandler}
              value={newVolunteer.contact}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="skills">Skills</label>
            <input
              type="string"
              name="skills"
              onChange={skillChangeHandler}
              value={arrayData.skills}
            />
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
            <ul>
              {newVolunteer?.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="field-style">
            <label htmlFor="skills">Area of interest</label>
            <input
              type="string"
              name="areaOfInterest"
              onChange={skillChangeHandler}
              value={arrayData.areaOfInterest}
            />
            <button type="button" onClick={addInterest}>
              Add Interest
            </button>
            <ul>
              {newVolunteer?.areaOfInterest?.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="field-style">
            <fieldset>
              <legend>Availibility:</legend>
              <label>
                <input
                  type="radio"
                  name="availibility"
                  value="true"
                  onChange={formChangeHandler}
                  checked={newVolunteer.availibility === "true"}
                  required
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="availibility"
                  value="false"
                  onChange={formChangeHandler}
                  checked={newVolunteer.availibility === "false"}
                />
                False
              </label>
            </fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

// import "./VolunteerModal.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { addVolunteer, updateVolunteer } from "../features/volunteerSlice";
import { useDispatch } from "react-redux";
export default function VolunteerModal(props) {
  const dispatch = useDispatch();
  const patient = props.patient ? props.patient : null;
  const [newPatient, setNewPatient] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : "",
    gender: patient ? patient.gender : "",
    medicalHistory: patient ? patient.medicalHistory : "",
    contact: patient ? patient.contact : "",
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

  const formChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (patient) {
      dispatch(
        updateVolunteer({ id: patient._id, updatedPatient: newPatient })
      );
    } else {
      dispatch(addVolunteer(newPatient));
    }
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>
        {patient ? "Update" : "Add"} Volunteer
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
              value={newPatient.name}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              onChange={formChangeHandler}
              value={newPatient.age}
              required
            />
          </div>
          <fieldset>
            <legend>Gender:</legend>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={formChangeHandler}
                checked={newPatient.gender === "male"}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={formChangeHandler}
                checked={newPatient.gender === "female"}
              />
              Female
            </label>
          </fieldset>
          <div className="field-style">
            <label htmlFor="contact">Contact</label>
            <input
              type="string"
              name="contact"
              onChange={formChangeHandler}
              value={newPatient.contact}
              required
            />
          </div>
          <div className="field-style">
            <fieldset>
              <legend>Is Medical History?</legend>
              <label>
                <input
                  type="radio"
                  name="medicalHistory"
                  value="true"
                  onChange={formChangeHandler}
                  checked={newPatient.medicalHistory === "true"}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="medicalHistory"
                  value="false"
                  onChange={formChangeHandler}
                  checked={newPatient.medicalHistory === "false"}
                />
                No
              </label>
            </fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

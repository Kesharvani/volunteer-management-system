import "./EventModal.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { addEvent, updateEvent } from "../features/eventSlice";
import { useDispatch } from "react-redux";

export default function EventModal(props) {
  const dispatch = useDispatch();
  const event = props.event ? props.event : null;
  const [newEvent, setNewEvent] = useState({
    name: event ? event.name : "",
    date: event ? event.date : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    numberOfVolunteerWithRole: event
      ? event.numberOfVolunteerWithRole
      : [
          { roleName: "", requiredVolunteers: "" }, // Initial role field
        ],
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

  const formChangeHandler = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;

    const updatedRoles = [...newEvent.numberOfVolunteerWithRole];
    updatedRoles[index] = { ...updatedRoles[index], [name]: value };
    setNewEvent({ ...newEvent, numberOfVolunteerWithRole: updatedRoles });
  };

  const submit = (e) => {
    e.preventDefault();
    if (event) {
      dispatch(updateEvent({ id: event?._id, updatedWard: newEvent }));
    } else {
      dispatch(addEvent(newEvent));
    }
    closeModal();
  };

  const addRoleField = () => {
    setNewEvent({
      ...newEvent,
      numberOfVolunteerWithRole: [
        ...newEvent.numberOfVolunteerWithRole,
        { roleName: "", requiredVolunteers: "" },
      ],
    });
  };

  const removeRoleField = (index) => {
    const updatedRoles = newEvent.numberOfVolunteerWithRole.filter(
      (role, i) => i !== index
    );
    setNewEvent({
      ...newEvent,
      numberOfVolunteerWithRole: updatedRoles,
    });
  };
  const specilizationItems = ["", "Pediatrics", "Surgery", "ICU"];
  return (
    <div>
      <button onClick={openModal}>{event ? "Update" : "Add"} event</button>
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
            <label htmlFor="name">Event Name:</label>
            <input
              type="string"
              name="name"
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              value={newEvent.name}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              value={newEvent.date}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="location">Location:</label>
            <input
              type="string"
              name="location"
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              value={newEvent.location}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="description">Description:</label>
            <input
              type="string"
              name="description"
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              value={newEvent.description}
              required
            />
          </div>

          <div className="field-style">
            <label htmlFor="roles">Roles:</label>
            {newEvent?.numberOfVolunteerWithRole?.map((role, index) => (
              <div key={index}>
                <label htmlFor={`roleName${index}`}>Role Name:</label>
                <input
                  type="text"
                  id={`roleName${index}`}
                  name="roleName"
                  value={role.roleName}
                  onChange={(e) => formChangeHandler(e, index)}
                />
                <label htmlFor={`requiredVolunteers${index}`}>
                  Required Volunteers:
                </label>
                <input
                  type="number"
                  id={`requiredVolunteers${index}`}
                  name="requiredVolunteers"
                  value={role.requiredVolunteers}
                  onChange={(e) => formChangeHandler(e, index)}
                />
                <button type="button" onClick={() => removeRoleField(index)}>
                  Remove Role
                </button>
              </div>
            ))}

            <button type="button" onClick={addRoleField}>
              Add Role
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

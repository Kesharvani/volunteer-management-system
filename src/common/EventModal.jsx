import "./EventModal.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { addEvent, updateEvent } from "../features/eventSlice";
import { useDispatch } from "react-redux";

export default function EventModal(props) {
  const dispatch = useDispatch();
  const event = props.event ? props.event : null;
  const [newWard, setNewWard] = useState({
    wardNumber: event ? event.wardNumber : "",
    capacity: event ? event.capacity : "",
    specializations: event ? event.specializations : "",
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
    setNewWard((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (event) {
      dispatch(updateEvent({ id: event?._id, updatedWard: newWard }));
    } else {
      dispatch(addEvent(newWard));
    }
    closeModal();
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
            <label htmlFor="wardNumber">event Number:</label>
            <input
              type="number"
              name="wardNumber"
              onChange={formChangeHandler}
              value={newWard.wardNumber}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              name="capacity"
              onChange={formChangeHandler}
              value={newWard.capacity}
              required
            />
          </div>
          <div className="field-style">
            <label htmlFor="specializations">Specializations</label>
            <select
              id="specializations"
              name="specializations"
              onChange={formChangeHandler}
              value={newWard.specializations}
            >
              {specilizationItems.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

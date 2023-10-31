import "./App.css";
import { FaHospitalSymbol } from "react-icons/fa";
import { NavLink, Routes, Route } from "react-router-dom";
import Volunteer from "./pages/Volunteer";
import Event from "./pages/Event";
import VolunteerDetails from "./pages/VolunteerDetails";
import EventDetails from "./pages/EventDetails";
import Footer from "./common/Footer";
function App() {
  const style = ({ isActive, isPending }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "#002884" : "black",
    };
  };
  return (
    <>
      <div className="App">
        <nav className="nav">
          <h3 className="patient-heading">
            <NavLink
              to="/"
              style={{ ...style, color: "#002884", textDecoration: "none" }}
            >
              Volunteer Management System
            </NavLink>
          </h3>
          <NavLink to="/" style={{ ...style, color: "#002884" }}>
            <FaHospitalSymbol size={30} className="hospital-icon" />
          </NavLink>
          <div className="navigations">
            <NavLink to="/" style={style}>
              Volunteer
            </NavLink>
            <NavLink to="/event" style={style}>
              Event
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Volunteer />} />
          <Route path="/event" element={<Event />} />
          <Route path="/volunteer/:id" element={<VolunteerDetails />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

import { useState } from "react";

const AddRsvp = ({ eventsId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://meetup-app-orcin.vercel.app/events/${eventsId}/rsvp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add RSVP.");
      }

      const data = await response.json();
      setMessage("RSVP added successfully!");
      setFormData({ name: "", email: "", attending: false });
      console.log("RSVP Added:", data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>RSVP</h2>
      {message && <p>{message}</p>}

      <label>Name:</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br /><br />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br /><br />

      <label>Attending:</label>
      <br />
        <input
          type="checkbox"
          name="attending"
          checked={formData.attending}
          onChange={handleChange}
        />
      
      <br /><br />

      <button type="submit" className="btn btn-primary">
        Submit RSVP
      </button>
    </form>
  );
};

export default AddRsvp;

import { useState } from "react";
import { useParams } from "react-router-dom";

const AddRsvp = () => {
  const { id } = useParams(); // eventId from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: false,
    guests: 0,
    notes: "",
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
        `https://your-backend.vercel.app/events/${id}/rsvp`,
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
      setFormData({
        name: "",
        email: "",
        attending: false,
        guests: 0,
        notes: "",
      });
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
      <br />
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br /><br />

      <label>Email:</label>
      <br />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br /><br />

      <label>Attending:</label>
      <input
        type="checkbox"
        name="attending"
        checked={formData.attending}
        onChange={handleChange}
      />
      <br /><br />

      <label>Number of Guests:</label>
      <br />
      <input
        type="number"
        name="guests"
        min="0"
        value={formData.guests}
        onChange={handleChange}
      />
      <br /><br />

      <label>Notes:</label>
      <br />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />
      <br /><br />

      <button type="submit">Submit RSVP</button>
    </form>
  );
};

export default AddRsvp;

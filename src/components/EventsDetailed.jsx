import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error } = useFetch(
    `https://meetup-app-orcin.vercel.app/events/${id}`
  );

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error occurred while fetching data.</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold">{event.title}</h2>
        <p className="text-muted">
          {event.date} | {event.type}
        </p>
        <img
          src={event.image || "https://via.placeholder.com/800x400"}
          alt={event.title}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      <div className="row">
        {/* Left Column */}
        <div className="col-md-8">
          <h4>Details</h4>
          <p>{event.description}</p>

          <h5>Venue</h5>
          <p>{event.venue}</p>

          <h5>Additional Information</h5>
          {event.speakers && (
            <p>
              <strong>Speakers: </strong>
              {event.speakers.join(", ")}
            </p>
          )}
          <p>
            <strong>Dress Code: </strong>
            {event.dressCode || "Casual"}
          </p>
          <p>
            <strong>Age Restriction: </strong>
            {event.ageRestriction || "None"}
          </p>

          <div className="mt-3">
            <strong>Tags: </strong>
            {event.tags?.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="col-md-4">
          <div className="card shadow p-4 sticky-top">
            <h4 className="fw-bold">
              {event.price ? `$${event.price}` : "Free"}
            </h4>
            <p>
              <strong>Date: </strong> {event.date}
            </p>
            <p>
              <strong>Venue: </strong> {event.venue}
            </p>
            <button className="btn btn-success w-100">Attend</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

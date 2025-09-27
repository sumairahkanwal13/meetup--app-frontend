import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import AddRsvp from "./AddRsvpForm";

const EventDetails = () => {
  const { eventsId } = useParams();
  const { data: event, loading, error } = useFetch(
    `https://meetup-app-orcin.vercel.app/events/${eventsId}`
  );

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error occurred while fetching data.</p>;
  if (!event) return <p>Event not found.</p>;

  console.log("Event details data:", event);

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-8">
          <h2>{event.title}</h2>
          <img
            src={event.image || "https://via.placeholder.com/600x300"}
            alt={event.title}
            className="img-fluid mb-3 rounded"
          />
          <p>
            <strong>Date: </strong>
            {event.date}
          </p>
          <p>
            <strong>Time: </strong>
            {event.time}
          </p>
          <p>
            <strong>Type: </strong>
            {event.type}
          </p>
          <p>
            <strong>Venue: </strong>
            {event.venue}
          </p>

          <h4>Details</h4>
          <p>{event.description}</p>

          <h4>Additional Information</h4>
          <p>
            <strong>Speakers: </strong>
            {event.speakers && event.speakers.length > 0 ? (
              <ul>
                {event.speakers.map((spk, index) => (
                  <li key={index}>{spk}</li>
                ))}
              </ul>
            ) : (
              "Not announced"
            )}
          </p>
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
              <span key={index} className="badge bg-secondary ms-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        
        <div className="col-md-4 mt-3 mt-md-0">
          <div className="card shadow p-4 sticky-top mt-4">
            <h4>{event.price ? `$${event.price}` : "Free"}</h4>
            <p>
              <strong>Date: </strong>
              {event.date}
            </p>
            <p>
              <strong>Time: </strong>
              {event.time}
            </p>
            <p>
              <strong>Venue: </strong>
              {event.venue}
            </p>
            
            <AddRsvp eventsId={eventsId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

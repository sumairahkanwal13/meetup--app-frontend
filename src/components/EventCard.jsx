import { Link } from "react-router-dom";

const EventCards = ({event}) => {
    if(!event){
        return <p>No event found.</p>
    }
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100" >
           <img
        src={event.image}
        alt={event.title}
        className="card-img-top rounded"
      />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.date} | {event.type}</p>
                <p>{event.venue}</p>
                <Link to={`/events/${event._id}`} className="btn btn-primary mt-auto">
                   View Details
                 </Link>
            </div>
            </div>
            </div>
    )
}
export default EventCards;
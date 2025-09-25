import useFetch from "../useFetch";
import { useState } from "react";
import EventCards from "./EventCard";

const EventList = () => {
  const { data: events, loading, error } = useFetch("https://meetup-app-orcin.vercel.app/events", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Both");

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error occurred while fetching data.</p>;

  const filteredEvent = events.filter((event) => {
    let matchFilter = true;
    let matchSearch = true;

    if (filterType !== "Both") {
      matchFilter = event.type.toLowerCase() === filterType.toLowerCase();
    }

    const query = searchQuery.toLowerCase();

    const titleMatch = event.title && event.title.toLowerCase().includes(query);
    const tagMatch = event.tags && event.tags.some((tag) => tag.toLowerCase().includes(query));

    matchSearch = titleMatch || tagMatch;

    return matchFilter && matchSearch;
  });

  return (
    <div className="container mt-4">
      
      <div className="mb-4 d-flex flex-column flex-md-row justify-content-between gap-3">
        <select
          className="form-select w-100 w-md-25"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="Both">Both</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search by title or tags"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      
      <div className="row">
        {filteredEvent.length > 0 ? (
          filteredEvent.map((event) => (
            <EventCards event={event} key={event._id} />
          ))
        ) : (
          <p>No event found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;

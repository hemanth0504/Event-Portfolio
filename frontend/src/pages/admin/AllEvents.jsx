import { useEffect } from "react";
import { useEventStore } from "../../stores/useEventStore";
import { format } from "date-fns";

export default function AllEvents() {
  const {
    events,
    deleteEvent,
    toggleFeaturedEvent,
    loading,
  } = useEventStore();

  const fetchAllEvents = useEventStore((state) => state.fetchAllEvents);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Events</h1>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border shadow rounded overflow-hidden"
            >
              <img
                src={event.images[0]?.url}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {event.category?.name || "Uncategorized"}
                </p>
                <p className="text-sm text-gray-500">
                  {event.eventDate ? format(new Date(event.eventDate), "PPP") : "No date"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleFeaturedEvent(event._id)}
                    className={`px-3 py-1 text-sm rounded ${
                      event.isFeatured
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {event.isFeatured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

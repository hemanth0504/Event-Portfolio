import { useEffect, useState } from "react";
import { useEventStore } from "../stores/useEventStore.js";
import EventSidebar from "../components/EventSidebar.jsx";
import axios from "../lib/axios.js";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState({ _id: "All", name: "All" });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    events,
    loading,
    setEvents,
    fetchEventsByCategory,
  } = useEventStore();

  useEffect(() => {
  const loadEvents = async () => {
  console.log("Selected category:", selectedCategory);

  if (selectedCategory._id === "All") {
    const [featuredRes, allRes] = await Promise.all([
      axios.get("/events/featured"),
      axios.get("/events"),
    ]);

    const featured = featuredRes.data;
    const all = allRes.data;

    const featuredIds = new Set(featured.map((e) => e._id));
    const combined = [...featured, ...all.filter((e) => !featuredIds.has(e._id))];

    useEventStore.getState().setEvents(combined);
  } else {
    try {
      const res = await axios.get(`/events/category/${selectedCategory._id}`);
      console.log("Events for category:", res.data.events); // ← check it's filtered
      useEventStore.getState().setEvents(res.data.events); // ✅ correctly extract `.events`
    } catch (err) {
      console.error("Failed to fetch category events:", err);
    }
  }
};

    loadEvents();
  }, [selectedCategory, setEvents, fetchEventsByCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await axios.get("/event-categories");
        setCategories([{ _id: "All", name: "All" }, ...res.data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

    console.log("Events from store:", events);

  return (
    <div className="flex px-6 py-10 gap-8 bg-[#FFFAF8]">
      <EventSidebar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        categories={categories}
        loading={loadingCategories}
      />

      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-[#2B2B2B]">
          {selectedCategory._id === "All"
            ? "Featured"
            : selectedCategory.name}
        </h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white border rounded-md overflow-hidden shadow-sm">
                <img
                  src={event.images?.[0]?.url}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#2B2B2B]">{event.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(event.eventDate).toLocaleDateString()}</p>
                  <p className="text-[#D9A5B3] text-sm mt-1">{event.category?.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

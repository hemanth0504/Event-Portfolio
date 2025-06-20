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


return (
  <div className="w-full px-6 py-10">
    <EventSidebar
      selected={selectedCategory}
      onSelect={setSelectedCategory}
      categories={categories}
      loading={loadingCategories}
    />

    <div className="mt-10">
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="w-full h-[300px] overflow-hidden rounded-xl"
            >
              <img
                src={event.images?.[0]?.url || "/fallback.jpg"}
                onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

 
  

}

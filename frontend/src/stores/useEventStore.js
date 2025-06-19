import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  setEvents: (events) => set({ events }),

fetchEventsByCategory: async (categoryId) => {
  set({ loading: true });
  try {
    const res = await axios.get(`/events/category/${categoryId}`);
    set({ events: res.data, loading: false }); // keep this as-is
  } catch (err) {
    set({ loading: false });
    toast.error(err.response?.data?.error || "Failed to fetch by category");
  }
},

fetchAllEvents: async () => {
  set({ loading: true });
  try {
    const res = await axios.get("/events");
    set({ events: res.data, loading: false });
  } catch (err) {
    set({ loading: false });
    toast.error(err.response?.data?.error || "Failed to fetch events");
  }
},



  createEvent: async (eventData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/events", eventData);
      set((state) => ({
        events: [res.data, ...state.events],
        loading: false,
      }));
      toast.success("Event created successfully");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Event creation failed");
    }
  },


  deleteEvent: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/events/${id}`);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        loading: false,
      }));
      toast.success("Event deleted");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Delete failed");
    }
  },

  
  toggleFeaturedEvent: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/events/${id}/featured`);
      set((state) => ({
        events: state.events.map((e) =>
          e._id === id ? { ...e, isFeatured: res.data.isFeatured } : e
        ),
        loading: false,
      }));
      toast.success("Toggled featured status");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Toggle failed");
    }
  },
}));

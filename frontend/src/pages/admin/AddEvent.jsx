import { useState, useEffect } from "react";
import axios from "../../lib/axios.js";
import { useEventStore } from "../../stores/useEventStore.js";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    eventDate: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  const { createEvent, loading } = useEventStore();

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axios.get("/event-categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching event categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    try {
      const res = await axios.post("/event-categories", { name: trimmed });
      setFormData((prev) => ({
        ...prev,
        category: res.data._id,
      }));
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "Aadhya-events");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dulniabxk/image/upload",
        imageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: false,
        }
      );

      const eventPayload = {
        title: formData.title,
        description: formData.description,
        images: [{ url: uploadRes.data.secure_url }],
        eventDate: formData.eventDate,
        category: formData.category,
      };

      await createEvent(eventPayload);

      setFormData({
        title: "",
        description: "",
        image: null,
        eventDate: "",
        category: "",
      });
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Failed to add event");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Select Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            disabled={loadingCategories}
            className="w-full border px-3 py-2 rounded text-sm bg-white"
          >
            <option value="">
              {loadingCategories ? "Loading categories..." : "-- Choose a category --"}
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* New Category Creation */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Or Add New Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="e.g. Wedding, Reception"
            />
          </div>
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-green-600 text-white px-3 py-2 rounded text-sm"
          >
            Add
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#D38DA8] hover:bg-[#c17797] text-white px-4 py-2 rounded text-sm"
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "../../lib/axios.js";
import { useProductStore } from "../../stores/useProductStore.js";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  const { createProduct, loading } = useProductStore();

  // Fetch all categories from server
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axios.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
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
      const res = await axios.post("/categories", { name: trimmed });

      // Set selected category to new category _id
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

      const productPayload = {
        name: formData.name,
        description: formData.description,
        image: uploadRes.data.secure_url,
        pricePerDay: parseFloat(formData.price),
        category: formData.category, // this is now _id string
        stock: 1,
      };

      await createProduct(productPayload);

      // Reset form
      setFormData({
        name: "",
        description: "",
        image: null,
        price: "",
        category: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
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

        {/* Image */}
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

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
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

        {/* Add New Category */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Or Add New Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="e.g. Centerpieces"
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#D38DA8] hover:bg-[#c17797] text-white px-4 py-2 rounded text-sm"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products || res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err });
      toast.error(err.response?.data?.error || "Failed to fetch products");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ products: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Failed to fetch featured products");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Failed to fetch by category");
    }
  },

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Product creation failed");
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      toast.success("Product deleted");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.error || "Delete failed");
    }
  },

  toggleFeaturedProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${id}/featured`);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p
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

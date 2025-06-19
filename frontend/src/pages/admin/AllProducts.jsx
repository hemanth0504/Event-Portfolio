import { useEffect } from "react";
import { Star, StarOff } from "lucide-react";
import { useProductStore } from "../../stores/useProductStore";

export default function AllProducts() {
  const {
    products,
    loading,
    deleteProduct,
    toggleFeaturedProduct,
  } = useProductStore();
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);


  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Category</th>
                <th className="p-2">Featured</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">${product.pricePerDay}</td>
                  <td className="p-2">{product.category?.name || "N/A"}</td>

                  <td className="p-2">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className="text-yellow-500 hover:text-yellow-600"
                      title={product.isFeatured ? "Unfeature" : "Feature"}
                    >
                      {product.isFeatured ? <Star fill="currentColor" /> : <StarOff />}
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

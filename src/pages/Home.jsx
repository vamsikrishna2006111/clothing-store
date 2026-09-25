import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading products...</h2>;
  }

  if (error) {
    return <h2 style={{ padding: "20px" }}>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trending Products</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import ProductCard from "../components/ProductCard";

import "../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [gender, setGender] =
    useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(
          "Shop products error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesGender =
        gender === "All" ||
        product.gender === gender ||
        product.gender === "Unisex";

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGender
      );
    });
  }, [
    products,
    search,
    category,
    gender,
  ]);

  return (
    <main className="shop-page">

      <div className="shop-header">

        <p>VK FASHIONS</p>

        <h1>SHOP ALL</h1>

        <span>
          Discover our latest collection
        </span>

      </div>

      <div className="shop-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
        >
          <option value="All">
            All
          </option>

          <option value="Men">
            Men
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Unisex">
            Unisex
          </option>
        </select>

      </div>

      {loading ? (
        <div className="shop-message">
          Loading products...
        </div>
      ) : (
        <>
          <p className="product-result-count">
            {filteredProducts.length} products
          </p>

          {filteredProducts.length === 0 ? (
            <div className="shop-message">
              No products found.
            </div>
          ) : (
            <div className="shop-grid">
              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                )
              )}
            </div>
          )}
        </>
      )}

    </main>
  );
}

export default Shop;
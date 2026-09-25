import React, {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";

import "../styles/TrendingProducts.css";

function TrendingProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const response =
            await fetch(
              "http://localhost:5000/api/products"
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch products"
            );
          }

          const data =
            await response.json();

          const featured =
            data
              .filter(
                (product) =>
                  product.featured
              )
              .slice(0, 4);

          setProducts(featured);
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  return (
    <section
      className="trending-section"
      id="trending"
    >
      <div className="trending-heading">

        <div>
          <motion.p>
            CURATED FOR YOU
          </motion.p>

          <motion.h2>
            TRENDING{" "}
            <span>NOW</span>
          </motion.h2>
        </div>

        <a href="/shop">
          VIEW ALL →
        </a>

      </div>

      {loading ? (
        <p>
          Loading products...
        </p>
      ) : (
        <div className="products-grid">
          {products.map(
            (product, index) => (
              <motion.div
                key={product._id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.1,
                }}
              >
                <ProductCard
                  product={product}
                />
              </motion.div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default TrendingProducts;
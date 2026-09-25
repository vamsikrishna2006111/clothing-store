import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./../styles/CategorySection.css";

const categories = [
  {
    id: 1,
    name: "MEN",
    subtitle: "Modern essentials",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "WOMEN",
    subtitle: "Elevated fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "KIDS",
    subtitle: "Everyday comfort",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "ACCESSORIES",
    subtitle: "Complete the look",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80",
  },
];

function CategorySection() {
  return (
    <section className="categories-section">

      <div className="categories-heading">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXPLORE COLLECTIONS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SHOP BY <span>CATEGORY</span>
        </motion.h2>
      </div>

      <div className="categories-grid">

        {categories.map((category, index) => (
          <motion.div
            className="category-card"
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
            }}
          >

            <img
              src={category.image}
              alt={category.name}
            />

            <div className="category-overlay"></div>

            <div className="category-content">

              <p>{category.subtitle}</p>

              <h3>{category.name}</h3>

              <Link to={`/shop?category=${category.name.toLowerCase()}`}>
                EXPLORE <span>→</span>
              </Link>

            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;
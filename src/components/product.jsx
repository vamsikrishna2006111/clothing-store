function ProductCard({ product }) {
    return (
        <div className="card">
            <img
                src={product.image}
                alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.category}</p>

            <h2>₹{product.price}</h2>

            <button>Add to Cart</button>

            <button>Wishlist</button>

            <button>View Details</button>
        </div>
    );
}

export default ProductCard;
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p>Material: {product.material}</p>
        <p>CO₂: {product.co2_estimate} kg</p>
        {product.eco_score <= 2 && <span className="text-green-600">🌿 Eco Friendly</span>}
      </div>
      <button
        onClick={() => onAdd(product)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

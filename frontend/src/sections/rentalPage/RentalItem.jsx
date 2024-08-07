import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

const RentalItem = () => {
  const [rentals, setRentals] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await fetch(
        "https://project-final-rentals-api.onrender.com/api/rentals"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rentals");
      }

      const data = await response.json();
      setRentals(data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    alert("Item added to the cart");
  };

  return (
    <div className="rentalItemContainer">
      {rentals.map((item, index) => (
        <div key={index} className="rentalItem">
          <img src={item.image} alt={item.name} className="rentalItemImage" />
          <div className="rentalItemDetails">
            <p className="rentalItemDescription">{item.description}</p>
            <h3 className="rentalItemPrice">{item.price}</h3>
            <button
              onClick={() => handleAddToCart(item)}
              className="addToCartButton"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalItem;

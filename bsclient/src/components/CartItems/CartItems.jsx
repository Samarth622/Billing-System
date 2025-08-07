import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { GoDash, GoPlus } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";

const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(AppContext);

  return (
    <div className="p-3 h-100 overflow-y-auto">
      {cartItems.length === 0 ? (
        <p className="text-light">Your cart is empty</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item mb-3 p-3 bg-dark rounded">
              <div className="d-flex justify-content-between align-items center mb-2">
                <h6 className="mb-0 text-light">{item.name}</h6>
                <p className="mb-0 text-light">
                  &#8377;{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items center">
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <GoDash />
                  </button>
                  <span className="text-light">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                  >
                    <GoPlus />
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ width: "auto" }}
                  onClick={() => removeFromCart(item.name)}
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;

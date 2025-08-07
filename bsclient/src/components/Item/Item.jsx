import "./Item.css";
import { FaCartPlus } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const Item = ({ itemName, itemPrice, itemImg, itemId }) => {
  const { addCart } = useContext(AppContext);

  const handleAddToCart = () => {
    addCart({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      itemId: itemId,
    });
  };

  return (
    <div className="p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-hover">
      <div style={{ position: "relative", marginRight: "15px" }}>
        <img src={itemImg} alt={itemName} className="item-image" />
      </div>

      <div className="flex-grow-1 ms-2">
        <h6 className="mb-1 text-light">{itemName}</h6>
        <p className="mb-0 fw-bold text-light">&#8377;{itemPrice}</p>
      </div>

      <div
        className="d-flex flex-column justify-content-between align-items-center ms-3"
        style={{ height: "100%" }}
      >
        <FaCartPlus className="fs-4 text-warning" />
        <button className="btn btn-success btn-sm" onClick={handleAddToCart}>
          <CiSquarePlus />
        </button>
      </div>
    </div>
  );
};

export default Item;

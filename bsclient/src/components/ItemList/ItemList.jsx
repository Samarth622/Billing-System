import React, { useState, useContext } from "react";
import "./ItemList.css";
import { CiSearch } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteItem } from "../../services/ItemService.js";
import toast from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";

const ItemList = () => {
  const { categories, items, setItems } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItemById = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const updatedItems = items.filter((item) => item.itemId !== itemId);
        setItems(updatedItems);
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the item");
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <CiSearch />
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredItems.map((item) => {
          const category = categories.find(
            (cat) => cat.categoryId === item.categoryId
          );

          return (
            <div key={item.itemId} className="col-12">
              <div
                className="card p-3"
                style={{ backgroundColor: "#333", cursor: "pointer" }}
                onClick={() => openModal(item)}
              >
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="item-image"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{item.name}</h5>
                    <p className="mb-0 text-white">
                      Category: {category?.name || "Unknown Category"}
                    </p>
                    <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                      &#8377;{item.price}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItemById(item.itemId);
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="col-12 text-center text-muted">
            No items match your search.
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedItem?.imgUrl}
            alt={selectedItem?.name}
            className="img-fluid mb-3"
            style={{ maxHeight: "250px", borderRadius: "10px" }}
          />
          <h4>{selectedItem?.name}</h4>
          <p className="text-muted">
            Category:{" "}
            {
              categories.find(
                (cat) => cat.categoryId === selectedItem?.categoryId
              )?.name
            }
          </p>
          <p>{selectedItem?.description || "No description available."}</p>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemList;

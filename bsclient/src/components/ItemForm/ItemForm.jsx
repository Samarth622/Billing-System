import { useContext, useState } from "react";
import { assest } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { addItem } from "../../services/ItemService.js";

const ItemForm = () => {
  const [image, setImage] = useState(null);

  const { categories, setItems, setCategories } = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.description || !image) {
      toast.error("Please fill all fields and upload an image");
      setLoading(false);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addItem(formData);
      if (response.status === 201) {
        setItems((prevItems) => [...prevItems, response.data]);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId === data.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );
        toast.success("Item added successfully!");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
      setData({
        name: "",
        category: "",
        price: "",
        description: "",
      });
      setImage(null);
    }
  };

  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assest.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    value={data.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={(e) => {
                      setData({ ...data, categoryId: e.target.value });
                    }}
                    value={data.categoryId}
                  >
                    <option value="">---Select Category---</option>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Categories Available</option>
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.00"
                    onChange={(e) => {
                      setData({ ...data, price: e.target.value });
                    }}
                    value={data.price}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here ..."
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                    }}
                    value={data.description}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;

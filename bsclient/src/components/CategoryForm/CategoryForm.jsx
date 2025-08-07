import React from "react";
import { assest } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { addCategory } from "../../services/CategoryService.js";
import { AppContext } from "../../context/AppContext.jsx";

const CategoryForm = () => {

  const { setCategories } = React.useContext(AppContext);

  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    bgColor: "#030303",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.name || !data.description || !image) {
      toast.error("Please fill all fields and upload an image");
      setLoading(false);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("category", JSON.stringify(data));
    try {
      const response = await addCategory(formData);
      if (response.status === 201) {
        setCategories((prev) => [...prev, response.data]);
        toast.success("Category added successfully");
        setData({
          name: "",
          description: "",
          bgColor: "#030303",
        });
        setImage(false);
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
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
                  onChange={(e) => setImage(e.target.files[0])}
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
                  placeholder="Category Name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
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
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  value={data.description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">
                  Background color
                </label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  placeholder="#030303"
                  onChange={(e) =>
                    setData({ ...data, bgColor: e.target.value })
                  }
                  value={data.bgColor}
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-warning w-100">
                {loading ? "Loading..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;

import Category from "../Category/Category.jsx";
import { assest } from "../../assets/assets.js";

const DisplayCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="row g-3" style={{ width: "100%", margin: 0 }}>
      <div
        className="col-md-3 col-sm-6"
        style={{ padding: "0 10px" }}
      >
        <Category
          categoryName="All Items"
          imgUrl={assest.AI}
          numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
          bgColor="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
      </div>

      {categories.map((category, index) => (
        <div
          className="col-md-3 col-sm-6"
          key={index}
          style={{ padding: "0 10px" }}
        >
          <Category
            categoryName={category.name}
            imgUrl={category.imgUrl}
            numberOfItems={category.items}
            bgColor={category.bgColor}
            isSelected={selectedCategory === category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCategory;

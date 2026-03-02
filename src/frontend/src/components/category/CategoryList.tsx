import { Category as CategoryType } from "../../types/Category";
import CategoryCard from "./CategoryCard";

interface CategoryListProps{
  category: CategoryType[];
  isLoading: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryList = ({category, isLoading, setShowModal} : CategoryListProps) => {
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Category Setup</h2>
            <button className="btn text-white" style={{ backgroundColor: "#9A616D" }} onClick={() => setShowModal(true)}>
              + Add Category
            </button>
        </div>
         <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: "#9A616D" }}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className="nav-link active">
                    Active Categories
                  </button>
                </li>
              </ul>
            </div>
            {isLoading ? (
                <div className="text-center mt-4">
                  <div className="spinner-border" role="status" />
                </div>
              ) : (
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {category.map((cat) => (
                      <CategoryCard key={cat.categoryid} category={cat}/>
                    ))}
                  </ul>
                </div>
              )}
          </div>
    </div>
  )
}
export default CategoryList;
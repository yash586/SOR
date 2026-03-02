import CategoryList from "../../components/category/CategoryList";
import { useEffect, useState  } from "react";
import { CategoryCreate, Category as CategoryType } from "../../types/Category";
import { getCategories, createCategory } from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

const Category = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const data = await getCategories();
        setCategory(data.data);
      } catch (error: any) {
        console.error(error)
      }finally{
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, [])

  const handleSave = async (newCategory: CategoryCreate) => {
    try {
      const response = await createCategory(newCategory);
      // response.data should be full Category
      
      setCategory((prev) => [...prev, response.data]);

      // Close modal
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  return(
    <>
    <CategoryList category={category} isLoading={isLoading} setShowModal={setShowModal}></CategoryList>

    <CategoryForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </> 
  )
}

export default Category;
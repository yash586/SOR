import { useEffect, useRef, useState } from "react"; 
import { createObservation } from "../services/observationService";
import { getCategories } from "../services/categoryService";
import { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import Select from "react-select";
import BackGroundTemplate from "../components/common/BackGroundTemplate";

const ObservationForm = () => {
  const title = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string; type:"success" | "danger"} | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createObservation({ 
              title: title.current?.value ?? "", 
              location: location.current?.value ?? "",
              date: formatDate(date.current?.value ?? ""),
              categoryid: selectedCategory?.value ?? "",
              employeeid: localStorage.getItem("token") ?? "",
              active: true
            });
      setToast({message: response.data.message, type:"success"});
      setTimeout(() => navigate("/observations"))
    } catch (error: any) {
      setToast({message: error.message, type:"danger"});
    }
  }

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
  
  useEffect(() => {
    const fetchCategories = async() =>{
        try {
          const data = await getCategories();
          setCategories(data.data);
        } catch (error: any) {
          console.error(error);
        }
      };
      fetchCategories();
    }, [])
  
  const options = categories.map((category: Category) => ({
    value: category.categoryId,
    label: category.categoryName,
    background: category.categoryBackGround,
  }));
  
  return (
    <>
  {toast && ( <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}></Toast>)}
  <div className="container-fluid py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Safety Observation — New</h2>
          <button className="btn btn-outline-secondary">← Back</button>
        </div>
        {/* Form Card */}
        <div className="card" style={{ borderRadius: "0.5rem" }}>
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#9A616D" }}
          >
            <h5 className="mb-0">Observation Details</h5>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    ref={title}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    ref={location}
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Category</label>
                  <Select
                    options={options}
                    value={selectedCategory}
                    onChange={(option) => setSelectedCategory(option)}
                    formatOptionLabel={(data) => (
                      <BackGroundTemplate
                        background={data.background}
                        categoryName={data.label}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date</label>
                  <input type="date" className="form-control" ref={date}/>
                </div>
              </div>
              {/* Submit */}
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/observations")}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#9A616D" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ObservationForm;
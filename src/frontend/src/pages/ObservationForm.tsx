import { useEffect, useMemo, useState } from "react"; 
import { getCategories } from "../services/categoryService";
import { Category } from "../types/Category";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import BackGroundTemplate from "../components/common/BackGroundTemplate";
import { ObservationCreate, Observation } from "../types/Observation";
import { epochToDate } from "../utils/dateUtils";

interface ObservationFormProps{
  onSubmit: (payload: ObservationCreate) => void;
  observation?: Observation;
}

const formatDateForInput = (dateString: string): string => {
  const [day, month, year] = dateString.split("/"); // "20/02/2026"
  return `${year}-${month}-${day}`; // "2026-02-20" ✅
};
const ObservationForm = ({onSubmit, observation} : ObservationFormProps) => {
  const isEditing = !!observation;
  const [title, setTitle] = useState<string>(observation?.title ?? "");
  const [location, setLocation] = useState<string>(observation?.location ?? "");
  const [date, setDate] = useState<string>(
  observation?.date ? epochToDate(Number(observation.date)) : "");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(
    observation ? { value: observation.category.categoryid, label: observation.category.categoryName, background: observation.category.categoryBackGround} : null
  );
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit({
        title,
        location,
        date: formatDateForInput(date),
        categoryid: selectedCategory?.value ?? "",
        employeeid: localStorage.getItem("token") ?? "",
      });
    } catch (error: any) {
      console.error(error);
    }
  };


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
  
  const options = useMemo(() => 
  categories.map((category: Category) => ({
    value: category.categoryid,
    label: category.categoryName,
    background: category.categoryBackGround,
  })), [categories]);

  useEffect(() => {
  if (observation && options.length > 0) {
    const existing = options.find(
      (opt) => opt.value === observation.category.categoryid
    );
    setSelectedCategory(existing ?? null);
  }
}, [options]);
  
  return (
    <>
    <div className="container-fluid py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
           <h2>{isEditing ? "Safety Observation — Edit" : "Safety Observation — New"}</h2>
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
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    value={location}
                     onChange={(e) => setLocation(e.target.value)}
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
                  <input type="date" className="form-control" value={date}
                     onChange={(e) => setDate(e.target.value)}/>
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
                  {isEditing ? "Update" : "Submit"}
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
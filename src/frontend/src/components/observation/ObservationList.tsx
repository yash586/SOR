import { ObservationType } from "../../types/Observation";
import ObservationCard from "./ObservationCard";
import { useNavigate } from "react-router-dom";

interface ObservationListProps {
  observations: ObservationType[];
  activeTab: "active" | "inactive";
  onTabChange: (tab: "active" | "inactive") => void;
  isLoading: boolean;
  onDelete: (id: string) => {};
}
const ObservationList = ({observations, onTabChange, activeTab, isLoading, onDelete} : ObservationListProps) => {
  const navigate = useNavigate();
  
  const handleDelete = (id: string) => {
    onDelete(id);
  }
  return(
    <div className="container-fluid py-4">
        {/* Header Row */}
        <div className="d-flex justify-content-between    align-items-center mb-4">
            <h2 className="fw-bold mb-0">Safety Observations</h2>
            <button className="btn text-white" style={{ backgroundColor: "#9A616D" }} onClick={() => navigate("/observations/create")}>
              + Add Observation
            </button>
        </div>
        <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: "#9A616D" }}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "active" ? "active" : ""}`}
                    onClick={() => onTabChange("active")}
                  >
                    Active
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "inactive" ? "active" : ""}`}
                    onClick={() => onTabChange("inactive")}
                  >
                    Inactive
                  </button>
                </li>
              </ul>
            </div>
              {/* list */}
              {isLoading ? (
                <div className="text-center mt-4">
                  <div className="spinner-border" role="status" />
                </div>
              ) : (
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {observations.map((obs) => (
                      <ObservationCard key={obs.recordId} observation={obs} handleDelete={handleDelete}/>
                    ))}
                  </ul>
                </div>
              )}
        </div>
    </div>
  );
}
export default ObservationList;
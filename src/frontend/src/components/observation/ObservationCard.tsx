import { useNavigate } from "react-router-dom";
import BackGroundTemplate from "../common/BackGroundTemplate";

const ObservationCard = ({observation, handleDelete}:any) => {
  const formatted = new Date(observation.date).toLocaleDateString("en-GB");
  const navigate = useNavigate();
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center py-3">
        <div>
          <h6 className="mb-1 fw-bold">{observation.title}</h6>
          <small className="text-muted">
            📍 {observation.location} &nbsp;|&nbsp; 📅 {formatted} 
          </small>
          {observation.fileUrl && (
            <div className="mt-2">
              {observation.fileUrl.match(/\.(jpg|jpeg|png)$/i) ? (
                // image
                <img
                  src={observation.fileUrl}
                  alt="attachment"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  className="rounded"
                />
              ) : (
                // pdf or other
                <a
                  href={observation.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-secondary mt-1"
                >
                  📎 View Attachment
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <BackGroundTemplate 
            background={observation.category.categoryBackground}
            categoryName={observation.category.categoryName}
          />
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => navigate(`/observations/edit/${observation.recordId}`, {state: {observation: observation}})}
          >
            Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => handleDelete(observation.recordId)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  )
}
export default ObservationCard;
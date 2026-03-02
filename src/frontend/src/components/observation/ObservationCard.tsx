import BackGroundTemplate from "../common/BackGroundTemplate";

const ObservationCard = ({observation, handleDelete}:any) => {
  const formatted = new Date(observation.date).toLocaleDateString("en-GB");
  return (
    <>
    {/* Observation Item */}
      <li className="list-group-item d-flex justify-content-between align-items-center py-3">
        <div>
          <h6 className="mb-1 fw-bold">{observation.title}</h6>
          <small className="text-muted">
            📍 {observation.location} &nbsp;|&nbsp; 📅 {formatted}
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <BackGroundTemplate background={observation.category.categoryBackground}categoryName={observation.category.categoryName}></BackGroundTemplate>
          <button className="btn btn-sm btn-outline-secondary">View</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(observation.recordId)}>Delete</button>
        </div>
      </li>
    </>
  )
}
export default ObservationCard;
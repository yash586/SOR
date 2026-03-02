import BackGroundTemplate from "../common/BackGroundTemplate";


const CategoryCard = ({category} : any) => {

  return (
    <>
    {/* Category Item */}
  <li className="list-group-item d-flex justify-content-between align-items-center py-3" key={category.categoryid}>
    <BackGroundTemplate background={category.categoryBackGround} categoryName={category.categoryName}></BackGroundTemplate>
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-sm btn-outline-danger">
        Delete
      </button>
    </div>
  </li>
    </>
  )
}

export default CategoryCard;
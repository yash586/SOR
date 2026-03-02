type Props = {
  background?: string;
  categoryName: string;
}

const BackGroundTemplate = ({background, categoryName}: Props) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className="rounded-circle"
        style={{
          width: "14px",
          height: "14px",
          minWidth: "14px",
          border: "2px solid",
          borderColor: background || "#6c757d",
          backgroundColor: background || "transparent",
        }}
      ></span>
      <span>{categoryName}</span>
    </div>
  )
}

export default BackGroundTemplate;
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CategoryCreate } from "../../types/Category";

type Props = {
  show: boolean;
  handleClose: () => void;
  onSave: (category: CategoryCreate) => void;
};

const CategoryForm = ({ show, handleClose, onSave }: Props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = () => {
    const newCategory: CategoryCreate = {
      categoryName: name,
      categoryBackGround: color,
    };

    onSave(newCategory);
    handleClose();       // Close modal
    setName("");         // Reset form
    setColor("#000000");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryForm;